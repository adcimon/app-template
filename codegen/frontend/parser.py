from __future__ import annotations

import json

import ir

primitive_types = {'boolean', 'integer', 'number', 'string'}

http_methods = ('get', 'post', 'put', 'patch', 'delete', 'options', 'head')

def parse(spec_path: str) -> ir.Spec:
	with open(spec_path, 'r', encoding='utf-8') as f:
		doc = json.load(f)

	version = doc.get('info', {}).get('version', '0.0.0')

	security_enum, security_titles = find_security_enum(doc)

	raw_schemas = doc.get('components', {}).get('schemas', {})
	schemas: list[ir.Schema] = []
	for name in sorted(raw_schemas.keys()):
		schema = parse_schema(name, raw_schemas[name], raw_schemas)
		schemas.append(schema)

	resolve_discriminants(schemas)

	topological_sort(schemas)

	operations: list[ir.Operation] = parse_operations(doc)
	resolve_operations_security(operations, security_titles)

	operation_schemas: list[ir.Schema] = build_operation_schemas(operations, security_enum)
	schemas.extend(operation_schemas)

	return ir.Spec(version=version, schemas=schemas, operations=operations, security_enum=security_enum)

# --------------------------------------------------
# Schemas
# --------------------------------------------------

def parse_schema(name: str, raw: dict, raw_schemas: dict) -> ir.Schema:
	if is_union(raw):
		return parse_union(name, raw)
	if is_const_enum(raw):
		return parse_const_enum(name, raw)
	if is_const_array(raw):
		return parse_const_array(name, raw)
	if is_enum(raw):
		return parse_enum(name, raw)
	return parse_object(name, raw, raw_schemas)

def ref_name(ref: str) -> str:
	# '#/components/schemas/User' -> 'User'
	return ref.rsplit('/', 1)[-1]

def is_union(raw: dict) -> bool:
	# {discriminator: {propertyName, mapping}}.
	return 'discriminator' in raw

def is_const_enum(raw: dict) -> bool:
	# {type, oneOf: [{title, const}, ...]} with scalar consts.
	one_of = raw.get('oneOf')
	return bool(one_of) and all('const' in e and not isinstance(e['const'], (dict, list)) for e in one_of)

def is_const_array(raw: dict) -> bool:
	# {type: array, items: $ref, const: [...]}.
	return raw.get('type') == 'array' and 'const' in raw

def is_enum(raw: dict) -> bool:
	# {enum: [...]}.
	return 'enum' in raw

def parse_const_enum(name: str, raw: dict) -> ir.EnumSchema:
	members = [ir.EnumMember(name=e.get('title', str(e['const'])), value=e['const']) for e in raw['oneOf']]
	return make_enum(name, raw, members)

def parse_enum(name: str, raw: dict) -> ir.EnumSchema:
	members = [ir.EnumMember(name=str(v), value=v) for v in raw['enum']]
	return make_enum(name, raw, members)

def make_enum(name: str, raw: dict, members: list[ir.EnumMember]) -> ir.EnumSchema:
	return ir.EnumSchema(name=name, base=raw.get('type', 'string'), members=members, description=raw.get('description'))

def parse_const_array(name: str, raw: dict) -> ir.ConstArraySchema:
	items = raw.get('items', {})
	item_type = parse_type(items) if items else ir.PrimitiveType('any')
	return ir.ConstArraySchema(name=name, item_type=item_type, values=raw['const'])

def parse_union(name: str, raw: dict) -> ir.UnionSchema:
	discriminator = raw['discriminator']
	prop = discriminator['propertyName']

	prop_schema = raw.get('properties', {}).get(prop, {})
	discriminant_enum = ref_name(prop_schema['$ref']) if '$ref' in prop_schema else None

	variants = [ir.Variant(tag=tag, schema=ref_name(ref)) for tag, ref in discriminator.get('mapping', {}).items()]

	return ir.UnionSchema(name=name, discriminant=prop, enum=discriminant_enum, variants=variants, description=raw.get('description'))

def parse_object(name: str, raw: dict, raw_schemas: dict) -> ir.ObjectSchema:
	props, required = merge_properties(raw, raw_schemas)

	fields: list[ir.Field] = []
	for prop_name, praw in props.items():
		fields.append(
			ir.Field(
				name=prop_name,
				type=parse_type(praw),
				required=prop_name in required,
				nullable=bool(praw.get('nullable', False)),
				description=praw.get('description'),
			)
		)

	return ir.ObjectSchema(name=name, fields=fields, description=raw.get('description'))

def merge_properties(raw: dict, raw_schemas: dict) -> tuple[dict, set[str]]:
	props: dict = {}
	required: set[str] = set()

	for sub in raw.get('allOf', []):
		if '$ref' in sub:
			ref = ref_name(sub['$ref'])
			if ref in raw_schemas:
				sub_props, sub_required = merge_properties(raw_schemas[ref], raw_schemas)
				props.update(sub_props)
				required |= sub_required
		else:
			sub_props, sub_required = merge_properties(sub, raw_schemas)
			props.update(sub_props)
			required |= sub_required

	for prop_name, praw in raw.get('properties', {}).items():
		props[prop_name] = praw
	required |= set(raw.get('required', []))

	return props, required

def parse_type(raw: dict) -> ir.Type:
	# Reference to schema.
	if '$ref' in raw:
		return ir.RefType(name=ref_name(raw['$ref']))

	# Single ref allOf -> ref.
	all_of = raw.get('allOf')
	if all_of and len(all_of) == 1 and '$ref' in all_of[0]:
		return ir.RefType(name=ref_name(all_of[0]['$ref']))

	# Inline string enums -> plain strings.
	if 'enum' in raw:
		return ir.PrimitiveType(name='string')

	type = raw.get('type')

	if type == 'array':
		items = raw.get('items', {})
		return ir.ArrayType(items=parse_type(items) if items else ir.PrimitiveType('any'))

	if type == 'object':
		additional = raw.get('additionalProperties')
		if isinstance(additional, dict):
			return ir.MapType(values=parse_type(additional))
		if additional is True:
			return ir.MapType(values=ir.PrimitiveType('any'))
		return ir.PrimitiveType(name='any')

	if type in primitive_types:
		return ir.PrimitiveType(name=type, format=raw.get('format'))

	return ir.PrimitiveType(name='any')

# --------------------------------------------------
# Discriminants
# --------------------------------------------------

def resolve_discriminants(schemas: list[ir.Schema]) -> None:
	by_name = {s.name: s for s in schemas}

	for union in schemas:
		if not isinstance(union, ir.UnionSchema) or not union.enum:
			continue

		enum = by_name.get(union.enum)
		if not isinstance(enum, ir.EnumSchema):
			continue

		member_by_value = {m.value: m.name for m in enum.members}

		for variant in union.variants:
			obj = by_name.get(variant.schema)
			member = member_by_value.get(variant.tag)
			if not isinstance(obj, ir.ObjectSchema) or member is None:
				continue

			for field in obj.fields:
				if field.name == union.discriminant:
					field.type = ir.EnumMemberType(enum=union.enum, member=member)

# --------------------------------------------------
# Security
# --------------------------------------------------

def find_security_enum(doc: dict) -> tuple[str | None, dict[str, str]]:
	schemes = set(doc.get('components', {}).get('securitySchemes', {}))
	if not schemes:
		return None, {}

	schemas = doc.get('components', {}).get('schemas', {})
	for name in sorted(schemas):
		one_of = schemas[name].get('oneOf')
		if not one_of:
			continue

		members = {e['const']: e.get('title', str(e['const'])) for e in one_of if 'const' in e}

		if schemes <= members.keys():
			return name, members

	return None, {}

def parse_security(op: dict) -> list[str]:
	keys: list[str] = []

	for requirement in op.get('security', []):
		for key in requirement:
			if key not in keys:
				keys.append(key)

	return keys

# --------------------------------------------------
# Operations
# --------------------------------------------------

def parse_operations(doc: dict) -> list[ir.Operation]:
	operations: list[ir.Operation] = []

	paths = doc.get('paths', {})
	for path in paths:
		item = paths[path]
		for method in http_methods:
			if method in item:
				operations.append(parse_operation(path, method, item[method]))

	operations.sort(key=lambda o: o.operation_id)

	return operations

def parse_operation(path: str, method: str, op: dict) -> ir.Operation:
	request_body, request_content_type = parse_request_type(op)
	response_body, response_wrapper, response_content_type = parse_response_type(op)
	operation: ir.Operation = ir.Operation(
		operation_id=op.get('operationId', f'{method}_{path}'),
		method=method,
		path=path,
		params=parse_params(op),
		path_params=parse_params_type(op, 'path'),
		query_params=parse_params_type(op, 'query'),
		request_content_type=request_content_type,
		request_body=request_body,
		response_content_type=response_content_type,
		response_body=response_body,
		response_wrapper=response_wrapper,
		security=parse_security(op),
	)
	return operation

def parse_params_type(op: dict, location: str) -> str | None:
	# $ref: #/.../schemas/{name}/properties/{prop}
	names = {
		p['schema']['$ref'].split('/')[3]
		for p in op.get('parameters', [])
		if p.get('in') == location and '/properties/' in p.get('schema', {}).get('$ref', '')
	}
	return next(iter(names)) if len(names) == 1 else None

def parse_params(op: dict) -> list[ir.Param]:
	# Inline params.
	params: list[ir.Param] = []

	for p in op.get('parameters', []):
		schema = p.get('schema', {})
		if p.get('in') in ('path', 'query') and '/properties/' not in schema.get('$ref', ''):
			params.append(ir.Param(name=p['name'], type=parse_type(schema), required=bool(p.get('required', False)), location=p['in']))

	return params

def parse_request_type(op: dict) -> tuple[ir.Type | None, str | None]:
	content = op.get('requestBody', {}).get('content', {})
	content_type = 'application/json' if 'application/json' in content else next(iter(content), None)
	schema = content.get(content_type, {}).get('schema') if content_type else None
	return (parse_type(schema) if schema else None), content_type

def parse_response_type(op: dict) -> tuple[ir.Type | None, str | None, str | None]:
	responses = op.get('responses', {})

	for code in sorted(responses):
		if not code.startswith('2'):
			continue

		content = responses[code].get('content', {})
		content_type = 'application/json' if 'application/json' in content else next(iter(content), None)
		schema = content.get(content_type, {}).get('schema') if content_type else None

		if schema:
			type, wrapper = unwrap(schema)
			return type, wrapper, content_type

	return None, None, None

def unwrap(schema: dict) -> tuple[ir.Type | None, str | None]:
	# {allOf: [{$ref: <wrapper>}, {properties: {data: <payload>}}]} -> (payload, wrapper).
	all_of = schema.get('allOf')
	if all_of:
		wrapper = None
		data = None
		for sub in all_of:
			if '$ref' in sub:
				wrapper = ref_name(sub['$ref'])
			else:
				data = sub.get('properties', {}).get('data', data)
		if wrapper and data is not None:
			return parse_type(data), wrapper

	return parse_type(schema), None

def resolve_operations_security(operations: list[ir.Operation], security_titles: dict) -> None:
	for op in operations:
		op.security = [security_titles.get(key, key) for key in op.security]

def build_operation_schemas(operations: list[ir.Operation], security_enum: str | None) -> list[ir.Schema]:
	if not operations:
		return []

	used_methods: set[str] = {op.method for op in operations}
	method = ir.EnumSchema(
		name='Method',
		base='string',
		members=[ir.EnumMember(name=method.capitalize(), value=method.upper()) for method in http_methods if method in used_methods],
	)

	def field(name: str, type: ir.Type) -> ir.Field:
		return ir.Field(name=name, type=type, required=True, nullable=False)

	body = ir.ObjectSchema(name='BodyType', fields=[
		field('contentType', ir.PrimitiveType('string')),
		field('wrapper', ir.PrimitiveType('string')),
		field('type', ir.PrimitiveType('string')),
		field('isArray', ir.PrimitiveType('boolean')),
	])

	param = ir.ObjectSchema(name='Param', fields=[
		field('name', ir.PrimitiveType('string')),
		field('type', ir.PrimitiveType('string')),
		field('required', ir.PrimitiveType('boolean')),
	])

	params = ir.ObjectSchema(name='ParamsType', fields=[
		field('type', ir.PrimitiveType('string')),
		field('params', ir.ArrayType(ir.RefType('Param'))),
	])

	endpoint = ir.ObjectSchema(name='Endpoint', fields=[
		field('method', ir.RefType('Method')),
		field('path', ir.PrimitiveType('string')),
		field('pathParams', ir.RefType('ParamsType')),
		field('queryParams', ir.RefType('ParamsType')),
		field('requestBody', ir.RefType('BodyType')),
		field('responseBody', ir.RefType('BodyType')),
		field('security', ir.ArrayType(ir.RefType(security_enum) if security_enum else ir.PrimitiveType('string'))),
	])

	return [method, body, param, params, endpoint]

# --------------------------------------------------
# Utils
# --------------------------------------------------

def schema_dependencies(schema: ir.Schema) -> set[str]:
	deps: set[str] = set()

	def walk(t: ir.Type) -> None:
		if isinstance(t, ir.RefType):
			deps.add(t.name)
		elif isinstance(t, ir.ArrayType):
			walk(t.items)
		elif isinstance(t, ir.MapType):
			walk(t.values)
		elif isinstance(t, ir.EnumMemberType):
			deps.add(t.enum)

	if isinstance(schema, ir.ObjectSchema):
		for field in schema.fields:
			walk(field.type)
	elif isinstance(schema, ir.ConstArraySchema):
		walk(schema.item_type)
	elif isinstance(schema, ir.UnionSchema):
		deps.update(variant.schema for variant in schema.variants)
		if schema.enum:
			deps.add(schema.enum)

	return deps

def topological_sort(schemas: list[ir.Schema]) -> None:
	by_name = {s.name: s for s in schemas}
	deps = {name: (schema_dependencies(by_name[name]) & by_name.keys()) - {name} for name in by_name}

	ordered: list[ir.Schema] = []
	emitted: set[str] = set()
	remaining = sorted(by_name)

	while remaining:
		ready = next((n for n in remaining if deps[n] <= emitted), None)
		if ready is None:
			ordered.extend(by_name[n] for n in remaining)
			break
		ordered.append(by_name[ready])
		emitted.add(ready)
		remaining.remove(ready)

	schemas[:] = ordered

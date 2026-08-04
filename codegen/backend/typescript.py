from __future__ import annotations

from string import Template

import ir
from backend import emitter

class TypeScriptEmitter(emitter.Emitter):
	@classmethod
	def key(cls) -> str:
		return 'ts'

	@classmethod
	def types(cls) -> dict[str, str]:
		return {
			'string': 'string',
			'integer': 'number',
			'number': 'number',
			'boolean': 'boolean',
			'any': 'unknown',
			'binary': 'Blob',
		}

	@classmethod
	def filename(cls) -> str:
		return 'api.ts'

	def prologue(self, spec: ir.Spec) -> str:
		return self.banner(spec, '//')

	def emit_version(self, spec: ir.Spec) -> str:
		return VERSION.substitute(version=self.render_value(spec.version))

	def emit_enum(self, schema: ir.EnumSchema) -> str:
		members = '\n'.join(
			ENUM_MEMBER.substitute(name=member.name, value=self.render_value(member.value))
			for member in schema.members
		)
		return ENUM.substitute(name=schema.name, members=members)

	def emit_object(self, schema: ir.ObjectSchema) -> str:
		fields = '\n'.join(
			TYPE_FIELD.substitute(
				name=field.name,
				optional='' if field.required else '?',
				type=self.render_type(field.type) + (' | null' if field.nullable else ''),
			)
			for field in schema.fields
		)
		return TYPE.substitute(name=schema.name, fields=fields)

	def emit_const_array(self, schema: ir.ConstArraySchema) -> str:
		values = '\n'.join('\t' + self.render_value(value) + ',' for value in schema.values)
		return CONST_ARRAY.substitute(name=schema.name, item=self.render_type(schema.item_type), values=values)

	def emit_union(self, schema: ir.UnionSchema) -> str:
		variants = ' | '.join(variant.schema for variant in schema.variants)
		return UNION.substitute(name=schema.name, variants=variants)

	def emit_endpoints(self, spec: ir.Spec) -> str:
		entries = '\n'.join(self.render_endpoint(op, spec.security_enum) for op in spec.operations)
		return ENDPOINTS.substitute(entries=entries)

	def render_value(self, value) -> str:
		if isinstance(value, bool):
			return 'true' if value else 'false'
		if isinstance(value, (int, float)):
			return str(value)
		if isinstance(value, str):
			return STRING.substitute(value=value.replace('\\', '\\\\').replace("'", "\\'"))
		if isinstance(value, dict):
			pairs = ', '.join(PAIR.substitute(key=k, value=self.render_value(v)) for k, v in value.items())
			return OBJECT.substitute(pairs=pairs)
		if isinstance(value, list):
			return LIST.substitute(items=', '.join(self.render_value(v) for v in value))
		return 'null'

	def render_enum_member(self, t: ir.EnumMemberType) -> str:
		return f'{t.enum}.{t.member}'

	def render_array(self, t: ir.ArrayType) -> str:
		inner = self.render_type(t.items)
		return (UNION_ARRAY if ' | ' in inner else ARRAY).substitute(item=inner)

	def render_map(self, t: ir.MapType) -> str:
		return RECORD.substitute(value=self.render_type(t.values))

	def render_endpoint(self, op: ir.Operation, security_enum: str | None) -> str:
		if security_enum:
			security = ', '.join(f'{security_enum}.{s}' for s in op.security)
		else:
			security = ', '.join(self.render_value(s) for s in op.security)

		return ENDPOINT.substitute(
			id=self.render_value(op.operation_id),
			method=f'Method.{op.method.capitalize()}',
			path=self.render_value(op.path),
			pathParams=self.render_value(self.params_dict(op.path_params, op, 'path')),
			queryParams=self.render_value(self.params_dict(op.query_params, op, 'query')),
			requestBody=self.render_value(self.body_dict(op.request_body, None, op.request_content_type)),
			responseBody=self.render_value(self.body_dict(op.response_body, op.response_wrapper, op.response_content_type)),
			security=security,
		)


VERSION = Template('export const version = $version;')

STRING = Template("'$value'")

OBJECT = Template('{ $pairs }')

RECORD = Template('Record<string, $value>')

PAIR = Template('$key: $value')

ENUM = Template(
'''export enum $name {
$members
}''')

ENUM_MEMBER = Template('\t$name = $value,')

TYPE = Template(
'''export type $name = {
$fields
};''')

TYPE_FIELD = Template('\t$name$optional: $type;')

ARRAY = Template('$item[]')

CONST_ARRAY = Template(
'''export const $name: readonly $item[] = [
$values
];''')

LIST = Template('[$items]')

UNION = Template('export type $name = $variants;')

UNION_ARRAY = Template('Array<$item>')

ENDPOINT = Template(
'''\t$id: {
\t\tmethod: $method,
\t\tpath: $path,
\t\tpathParams: $pathParams,
\t\tqueryParams: $queryParams,
\t\trequestBody: $requestBody,
\t\tresponseBody: $responseBody,
\t\tsecurity: [$security],
\t},''')

ENDPOINTS = Template(
'''export const endpoints: Record<string, Endpoint> = {
$entries
};''')

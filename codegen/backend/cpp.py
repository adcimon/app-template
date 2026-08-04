from __future__ import annotations

import re
from string import Template

import ir
from backend import emitter

class CppEmitter(emitter.Emitter):
	@classmethod
	def key(cls) -> str:
		return 'cpp'

	@classmethod
	def types(cls) -> dict[str, str]:
		return {
			'string': 'std::string',
			'integer': 'int64_t',
			'number': 'double',
			'boolean': 'bool',
			'any': 'std::string',
			'binary': 'std::vector<uint8_t>',
		}

	@classmethod
	def filename(cls) -> str:
		return 'Api.h'

	def prologue(self, spec: ir.Spec) -> str:
		has_enums = any(isinstance(s, ir.EnumSchema) for s in spec.schemas)
		has_unions = any(isinstance(s, ir.UnionSchema) for s in spec.schemas)

		includes = ['#include <cstdint>', '#include <map>']
		if has_enums:
			includes.append('#include <stdexcept>')
		includes.append('#include <string>')
		if has_enums:
			includes.append('#include <string_view>')
		if has_unions:
			includes.append('#include <variant>')
		includes.append('#include <vector>')

		lines = [self.banner(spec, '//'), '', '#pragma once', ''] + includes

		if self.config.namespace:
			lines += ['', NAMESPACE_START.substitute(name=self.config.namespace)]

		if has_enums:
			lines += ['', ENUM_FORMAT_PARSE]

		return '\n'.join(lines)

	def epilogue(self, spec: ir.Spec) -> str:
		if self.config.namespace:
			return NAMESPACE_END
		return ''

	def emit_version(self, spec: ir.Spec) -> str:
		return VERSION.substitute(version=self.render_value(spec.version))

	def emit_enum(self, schema: ir.EnumSchema) -> str:
		integral = schema.base in ('integer', 'number')
		name = schema.name

		members = '\n'.join(
			ENUM_MEMBER.substitute(ident=self.ident(member.name), assign=(f' = {member.value}' if integral else ''))
			for member in schema.members
		)
		enum = ENUM.substitute(name=name, base=(' : int64_t' if integral else ''), members=members)

		cases = '\n'.join(
			FORMAT_CASE.substitute(
				name=name,
				ident=self.ident(member.name),
				result=(f'std::to_string({member.value})' if integral else self.render_value(member.value)),
			)
			for member in schema.members
		)
		fmt = FORMAT.substitute(name=name, cases=cases)

		checks = '\n'.join(
			PARSE_CHECK.substitute(
				token=(f'std::to_string({member.value})' if integral else self.render_value(member.value)),
				name=name,
				ident=self.ident(member.name),
			)
			for member in schema.members
		)
		prs = PARSE.substitute(name=name, checks=checks)

		return '\n\n'.join([enum, fmt, prs])

	def emit_object(self, schema: ir.ObjectSchema) -> str:
		fields = '\n'.join(
			STRUCT_FIELD.substitute(type=self.render_type(field.type), name=self.ident(field.name), default=self.field_default(field.type))
			for field in schema.fields
		)
		return STRUCT.substitute(name=schema.name, fields=fields)

	def field_default(self, t: ir.Type) -> str:
		if isinstance(t, ir.EnumMemberType):
			return f' = {t.enum}::{t.member}'
		return ''

	def emit_const_array(self, schema: ir.ConstArraySchema) -> str:
		values = '\n'.join('\t' + self.render_value(value) + ',' for value in schema.values)
		return CONST_ARRAY.substitute(item=self.render_type(schema.item_type), name=schema.name, values=values)

	def emit_union(self, schema: ir.UnionSchema) -> str:
		variants = ', '.join(variant.schema for variant in schema.variants)
		return VARIANT.substitute(name=schema.name, variants=variants)

	def emit_endpoints(self, spec: ir.Spec) -> str:
		entries = '\n'.join(self.render_endpoint(op, spec.security_enum) for op in spec.operations)
		return ENDPOINTS.substitute(entries=entries)

	def render_value(self, value) -> str:
		if isinstance(value, bool):
			return 'true' if value else 'false'
		if isinstance(value, (int, float)):
			return str(value)
		if isinstance(value, str):
			return STRING.substitute(value=value.replace('\\', '\\\\').replace('"', '\\"'))
		if isinstance(value, dict):
			return AGGREGATE.substitute(items=', '.join(self.render_value(v) for v in value.values()))
		if isinstance(value, list):
			return AGGREGATE.substitute(items=', '.join(self.render_value(v) for v in value)) if value else '{}'
		return '{}'

	def render_enum_member(self, t: ir.EnumMemberType) -> str:
		return t.enum

	def render_array(self, t: ir.ArrayType) -> str:
		return VECTOR.substitute(item=self.render_type(t.items))

	def render_map(self, t: ir.MapType) -> str:
		return MAP.substitute(value=self.render_type(t.values))

	def render_endpoint(self, op: ir.Operation, security_enum: str | None) -> str:
		if security_enum:
			security = ', '.join(f'{security_enum}::{s}' for s in op.security)
		else:
			security = ', '.join(self.render_value(s) for s in op.security)

		return ENDPOINT.substitute(
			id=self.render_value(op.operation_id),
			method=op.method.capitalize(),
			path=self.render_value(op.path),
			pathParams=self.render_value(self.params_dict(op.path_params, op, 'path')),
			queryParams=self.render_value(self.params_dict(op.query_params, op, 'query')),
			requestBody=self.render_value(self.body_dict(op.request_body, None, op.request_content_type)),
			responseBody=self.render_value(self.body_dict(op.response_body, op.response_wrapper, op.response_content_type)),
			security=('{ ' + security + ' }') if op.security else '{}',
		)

	def ident(self, value: str) -> str:
		out = re.sub(r'[^0-9a-zA-Z_]', '_', value)

		if out and out[0].isdigit():
			out = '_' + out

		return out or '_'

NAMESPACE_START = Template('namespace $name\n{')

NAMESPACE_END = '}'

VERSION = Template('inline const std::string version = $version;')

STRING = Template('"$value"')

AGGREGATE = Template('{ $items }')

ENUM = Template(
'''enum class $name$base
{
$members
};''')

ENUM_MEMBER = Template('\t$ident$assign,')

STRUCT = Template(
'''struct $name
{
$fields
};''')

STRUCT_FIELD = Template('\t$type $name$default;')

VECTOR = Template('std::vector<$item>')

CONST_ARRAY = Template(
'''inline const std::vector<$item> $name =
{
$values
};''')

MAP = Template('std::map<std::string, $value>')

VARIANT = Template('using $name = std::variant<$variants>;')

ENUM_FORMAT_PARSE = '''template <typename E>
std::string format(E value);

template <typename E>
E parse(std::string_view text);'''

FORMAT = Template(
'''template <>
inline std::string format<$name>($name value)
{
\tswitch (value)
\t{
$cases
\t}
\treturn {};
}''')

FORMAT_CASE = Template('\t\tcase $name::$ident: return $result;')

PARSE = Template(
'''template <>
inline $name parse<$name>(std::string_view text)
{
$checks
\tthrow std::invalid_argument("Invalid $name: " + std::string(text));
}''')

PARSE_CHECK = Template('\tif (text == $token) return $name::$ident;')

ENDPOINT = Template(
'''\t{ $id, {
\t\tMethod::$method,
\t\t$path,
\t\t$pathParams,
\t\t$queryParams,
\t\t$requestBody,
\t\t$responseBody,
\t\t$security,
\t} },''')

ENDPOINTS = Template(
'''inline const std::map<std::string, Endpoint> endpoints =
{
$entries
};''')

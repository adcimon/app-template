from __future__ import annotations

import abc
import dataclasses

import ir

@dataclasses.dataclass(frozen=True)
class EmitterConfig:
	namespace: str | None = None

class Emitter(abc.ABC):
	def __init__(self, config: EmitterConfig | None = None) -> None:
		self.config = config or EmitterConfig()

	def emit(self, spec: ir.Spec) -> str:
		blocks: list[str] = []

		blocks.append(self.prologue(spec))

		blocks.append(self.emit_version(spec))

		for schema in spec.schemas:
			blocks.append(self.emit_schema(schema))

		if spec.operations:
			blocks.append(self.emit_endpoints(spec))

		blocks.append(self.epilogue(spec))

		return '\n\n'.join(b for b in blocks if b) + '\n'

	def emit_schema(self, schema: ir.Schema) -> str:
		if isinstance(schema, ir.EnumSchema):
			return self.emit_enum(schema)
		if isinstance(schema, ir.ConstArraySchema):
			return self.emit_const_array(schema)
		if isinstance(schema, ir.ObjectSchema):
			return self.emit_object(schema)
		if isinstance(schema, ir.UnionSchema):
			return self.emit_union(schema)
		raise TypeError(f'Unsupported schema: {type(schema).__name__}')

	def render_ref(self, t: ir.RefType) -> str:
		return t.name

	def render_type(self, t: ir.Type) -> str:
		if isinstance(t, ir.PrimitiveType):
			return self.render_primitive(t)
		if isinstance(t, ir.RefType):
			return self.render_ref(t)
		if isinstance(t, ir.ArrayType):
			return self.render_array(t)
		if isinstance(t, ir.MapType):
			return self.render_map(t)
		if isinstance(t, ir.EnumMemberType):
			return self.render_enum_member(t)
		raise TypeError(f'Unsupported type: {type(t).__name__}')

	def render_primitive(self, t: ir.PrimitiveType) -> str:
		return self.types().get(t.format) or self.types()[t.name]

	def type_name(self, t: ir.Type | None) -> str:
		if isinstance(t, ir.RefType):
			return t.name
		if isinstance(t, ir.PrimitiveType):
			return t.name
		if isinstance(t, ir.ArrayType):
			return self.type_name(t.items)
		return ''

	def banner(self, spec: ir.Spec, comment: str) -> str:
		lines = ['@generated openapi.json', f'@version {spec.version}']
		return '\n'.join(f'{comment} {line}' for line in lines)

	def prologue(self, spec: ir.Spec) -> str:
		return ''

	def epilogue(self, spec: ir.Spec) -> str:
		return ''

	def params_dict(self, name: str | None, operation: ir.Operation, location: str) -> dict:
		params = [p for p in operation.params if p.location == location]
		return {'type': name or '', 'params': [{'name': p.name, 'type': self.type_name(p.type), 'required': p.required} for p in params]}

	def body_dict(self, t: ir.Type | None, wrapper: str | None, content_type: str | None) -> dict:
		return {'contentType': content_type or '', 'wrapper': wrapper or '', 'type': self.type_name(t), 'isArray': isinstance(t, ir.ArrayType)}

	@classmethod
	@abc.abstractmethod
	def key(cls) -> str: ...

	@classmethod
	@abc.abstractmethod
	def types(cls) -> dict[str, str]: ...

	@classmethod
	@abc.abstractmethod
	def filename(cls) -> str: ...

	@abc.abstractmethod
	def emit_version(self, spec: ir.Spec) -> str: ...

	@abc.abstractmethod
	def emit_enum(self, schema: ir.EnumSchema) -> str: ...

	@abc.abstractmethod
	def emit_object(self, schema: ir.ObjectSchema) -> str: ...

	@abc.abstractmethod
	def emit_const_array(self, schema: ir.ConstArraySchema) -> str: ...

	@abc.abstractmethod
	def emit_union(self, schema: ir.UnionSchema) -> str: ...

	@abc.abstractmethod
	def emit_endpoints(self, spec: ir.Spec) -> str: ...

	@abc.abstractmethod
	def render_enum_member(self, t: ir.EnumMemberType) -> str: ...

	@abc.abstractmethod
	def render_array(self, t: ir.ArrayType) -> str: ...

	@abc.abstractmethod
	def render_map(self, t: ir.MapType) -> str: ...

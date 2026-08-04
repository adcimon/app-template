from __future__ import annotations

import dataclasses

# --------------------------------------------------
# Types
# --------------------------------------------------

@dataclasses.dataclass
class RefType:
	# Name of another schema.
	name: str

@dataclasses.dataclass
class PrimitiveType:
	# 'boolean' | 'number' | 'string' | 'any'
	name: str
	format: str | None = None

@dataclasses.dataclass
class EnumMemberType:
	# Enum member used as discriminant type.
	enum: str
	member: str

@dataclasses.dataclass
class ArrayType:
	items: Type

@dataclasses.dataclass
class MapType:
	values: Type

Type = RefType | PrimitiveType | EnumMemberType | ArrayType | MapType

# --------------------------------------------------
# Schemas
# --------------------------------------------------

@dataclasses.dataclass
class ObjectSchema:
	name: str
	fields: list[Field] = dataclasses.field(default_factory=list)
	description: str | None = None

@dataclasses.dataclass
class Field:
	name: str
	type: Type
	required: bool
	nullable: bool
	description: str | None = None

@dataclasses.dataclass
class EnumSchema:
	name: str
	base: str = 'string' # 'integer' | 'number' | 'string'
	members: list[EnumMember] = dataclasses.field(default_factory=list)
	description: str | None = None

@dataclasses.dataclass
class EnumMember:
	name: str
	value: str | int

@dataclasses.dataclass
class ConstArraySchema:
	name: str
	item_type: Type
	values: list = dataclasses.field(default_factory=list)

@dataclasses.dataclass
class UnionSchema:
	name: str
	discriminant: str # Discriminant property name.
	enum: str | None
	variants: list[Variant] = dataclasses.field(default_factory=list)
	description: str | None = None

@dataclasses.dataclass
class Variant:
	tag: str # Discriminant value.
	schema: str # Discriminant schema.

Schema = ObjectSchema | EnumSchema | ConstArraySchema | UnionSchema

# --------------------------------------------------
# Operations
# --------------------------------------------------

@dataclasses.dataclass
class Param:
	name: str
	type: Type
	required: bool
	location: str  # 'path' | 'query'

@dataclasses.dataclass
class Operation:
	operation_id: str
	method: str
	path: str
	params: list[Param] = dataclasses.field(default_factory=list)
	path_params: str | None = None
	query_params: str | None = None
	request_content_type: str | None = None
	request_body: Type | None = None
	response_content_type: str | None = None
	response_body: Type | None = None
	response_wrapper: str | None = None
	security: list[str] = dataclasses.field(default_factory=list)

@dataclasses.dataclass
class Spec:
	version: str
	schemas: list[Schema] = dataclasses.field(default_factory=list)
	operations: list[Operation] = dataclasses.field(default_factory=list)
	security_enum: str | None = None

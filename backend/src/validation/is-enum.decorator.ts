import { IsEnum as IsEnumValidator, ValidationOptions } from 'class-validator';

export function IsEnum(enumType: object, options: ValidationOptions = {}) {
	return IsEnumValidator(enumType, {
		message: `Invalid $property, allowed values: ${Object.values(enumType).join(', ')}`,
		...options,
	});
}

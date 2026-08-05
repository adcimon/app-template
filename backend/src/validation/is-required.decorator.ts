import { IsNotEmpty, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsRequired(options: ValidationOptions = {}) {
	return IsNotEmpty({
		message: (args: ValidationArguments) => {
			return `Property ${args.property} is required`;
		},
		...options,
	});
}

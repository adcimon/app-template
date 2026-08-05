import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Explanation:
 *		\+ → Ensures it starts with a +.
 *		\d{1,4} → Matches the country code (1 to 4 digits, e.g., +1, +44, +123).
 *		\d{6,14} → Ensures the rest has only digits (between 6 and 14 digits, which covers most phone numbers).
 * Examples:
 *		"+11234567890" → Yes.
 *		"+441234567890" → Yes.
 *		"+911234567890" → Yes.
 *		"+8613812345678" → Yes.
 *		"1234567890" → No (missing + and country code).
 *		"+1 234567890" → No (spaces are not allowed).
 *		"+44-1234567890" → No (hyphens are not allowed).
 *		"+abc1234567890" → No (letters are not allowed).
 */
export const PhoneRegExp: RegExp = /^\+\d{1,4}\d{6,14}$/;
export const PhoneMessage: string = 'Phones must start with a country code and contain numeric characters';

export function IsPhone(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isPhone',
			target: object.constructor,
			propertyName: propertyName,
			options: {
				message: PhoneMessage,
				...validationOptions,
			},
			validator: {
				validate(value: any) {
					return typeof value === 'string' && PhoneRegExp.test(value);
				},
			},
		});
	};
}

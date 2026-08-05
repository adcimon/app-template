import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Explanation:
 *		\p{L} → Matches any unicode letter.
 *		\p{N} → Matches any unicode number.
 *		[ \p{L}\p{N}] → Allows spaces between words while ensuring each word consists of letters and numbers.
 * Examples:
 *		"Hello" → Yes (English).
 *		"你好" → Yes (Chinese).
 *		"こんにちは" → Yes (Japanese).
 *		"Привет" → Yes (Cyrillic).
 *		"مرحبا" → Yes (Arabic).
 *		"Hello123" → Yes.
 *		"Hola mundo" → Yes.
 *		"123Hello" → No (must start with a letter).
 */
export const NameRegExp: RegExp = /^\p{L}+[\p{L}\p{N}]*( [\p{L}\p{N}]+)*$/u;
export const NameMessage: string = 'Names must start with an alpha character and contain alphanumeric characters';

export function IsName(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isName',
			target: object.constructor,
			propertyName: propertyName,
			options: {
				message: NameMessage,
				...validationOptions,
			},
			validator: {
				validate(value: any) {
					return typeof value === 'string' && NameRegExp.test(value);
				},
			},
		});
	};
}

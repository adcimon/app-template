import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Explanation:
 *		\. → Matches the dot before the extension.
 *		(jpg|jpeg|png) → Ensures it ends with jpg, jpeg, or png.
 * Examples:
 *		"https://cdn.example.com/image.png" → Yes.
 *		"https://cdn.example.com/path/photo.jpeg" → Yes.
 *		"https://example.com/image.gif" → No (unsupported extension).
 */
export const IconRegExp: RegExp = /^$|\.(jpg|jpeg|png)$/iu;
export const IconMessage: string = 'Icons only support jpg, jpeg and png files';

export function IsIcon(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isIcon',
			target: object.constructor,
			propertyName: propertyName,
			options: {
				message: IconMessage,
				...validationOptions,
			},
			validator: {
				validate(value: any) {
					return typeof value === 'string' && IconRegExp.test(value);
				},
			},
		});
	};
}

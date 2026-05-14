import * as yup from 'yup';

export namespace ValidationSchema {
	/**
	 * Explanation:
	 *		[^\s@]+ → Ensures it starts with the local part (any unicode character except spaces and @).
	 *		@ → Ensures there is exactly one @ symbol.
	 *		[a-zA-Z0-9.-]+ → Matches the domain part (letters, numbers, dots and hyphens).
	 *		\. → Ensures there is at least one dot before the TLD.
	 *		[a-zA-Z]{2,} → Ensures a valid TLD with at least 2 letters (e.g., .com, .net, .org, .ai).
	 * Examples:
	 *		"user@example.com" → Yes.
	 *		"contact@sub.domain.net" → Yes.
	 *		"user@123.com" → Yes.
	 *		"jöhn.dœ@unicøde.com" → No (domain part with unicode characters).
	 *		"user@localhost" → No (missing TLD).
	 *		"@example.com" → No (missing local part).
	 *		"user@com" → No (TLD too short).
	 *		"user@@example.com" → No (double @).
	 *		"user example@domain.com" → No (spaces are not allowed).
	 */
	const EmailRegExp: RegExp = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
	const EmailMessage: string = 'Emails must have valid local, domain and a top-level domain parts';

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
	const PhoneRegExp: RegExp = /^\+\d{1,4}\d{6,14}$/;
	const PhoneMessage: string = 'Phones must start with a country code and contain numeric characters';

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
	const NameRegExp: RegExp = /^\p{L}+[\p{L}\p{N}]*( [\p{L}\p{N}]+)*$/u;
	const NameMessage: string = 'Names must start with an alpha character and contain alphanumeric characters';

	const SurnameRegExp: RegExp = NameRegExp;
	const SurnameMessage: string = 'Surnames must start with an alpha character and contain alphanumeric characters';

	/**
	 * Explanation:
	 *		\. → Matches the dot before the extension.
	 *		(jpg|jpeg|png) → Ensures it ends with jpg, jpeg, or png.
	 *		Note: URL format is validated by yup url.
	 * Examples:
	 *		"https://cdn.example.com/image.png" → Yes.
	 *		"https://cdn.example.com/path/photo.jpeg" → Yes.
	 *		"https://example.com/image.gif" → No (unsupported extension).
	 */
	const IconRegExp: RegExp = /^$|\.(jpg|jpeg|png)$/iu;
	const IconMessage: string = 'Icons only support jpg, jpeg and png files.';

	export const PasswordSchema = yup.string();

	export const EmailSchema = yup.string().email();
	export const PhoneSchema = yup.string().matches(PhoneRegExp, {
		excludeEmptyString: true,
		message: PhoneMessage,
	});

	export const NameSchema = yup.string().matches(NameRegExp, {
		excludeEmptyString: true,
		message: NameMessage,
	});
	export const SurnameSchema = yup.string().matches(SurnameRegExp, {
		excludeEmptyString: true,
		message: SurnameMessage,
	});

	export const DateSchema = yup.string(); // ISO 8601
	export const LocaleSchema = yup.string(); // BCP 47 Language Tag
	export const TimezoneSchema = yup.string(); // IANA Time Zone

	export const BirthdateSchema = yup.string();

	export const IconSchema = yup.string().url().matches(IconRegExp, IconMessage);

	export const RefreshTokenSchema = yup.string();
	export const CodeSchema = yup.string();
}

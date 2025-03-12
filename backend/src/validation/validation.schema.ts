import * as yup from 'yup';

export namespace ValidationSchema {
	const PHONE_REGEXP = /^\+[0-9]*$/;
	const PHONE_MESSAGE = 'Phones must start with a country prefix and contain numerical values.';

	const NAME_REGEXP = /^[a-zA-Z]+[a-zA-Z0-9]*( [a-zA-Z0-9]+)*$/;
	const NAME_MESSAGE = 'Names must start with an alpha character and contain alphanumeric characters.';

	const SURNAME_REGEXP = NAME_REGEXP;
	const SURNAME_MESSAGE = 'Surnames must start with an alpha character and contain alphanumeric characters.';

	const AVATAR_REGEXP = /^([^]*)(\.)(jpg|jpeg|png)$/;
	const AVATAR_MESSAGE = 'Avatars only supports jpg, jpeg and png files.';

	export const EmailSchema = yup.string().email();
	export const PasswordSchema = yup.string();
	export const PhoneSchema = yup.string().matches(PHONE_REGEXP, PHONE_MESSAGE);
	export const NameSchema = yup.string().matches(NAME_REGEXP, NAME_MESSAGE);
	export const SurnameSchema = yup.string().matches(SURNAME_REGEXP, SURNAME_MESSAGE);
	export const BirthdateSchema = yup.string();
	export const CountrySchema = yup.string();
	export const TimezoneSchema = yup.string();
	export const AvatarSchema = yup.string().url().matches(AVATAR_REGEXP, AVATAR_MESSAGE);

	export const RefreshTokenSchema = yup.string();
	export const CodeSchema = yup.string();
}

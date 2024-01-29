import * as yup from 'yup';

export namespace ValidationSchema {
	const PHONE_REGEXP = /^(^$)|(\+[0-9]*)$/;
	const PHONE_MESSAGE = 'Phone starts with a country prefix and contains numerical values.';

	const AVATAR_REGEXP = /^(^$)|(([^]*)(\.)(jpg|jpeg|png))$/;
	const AVATAR_MESSAGE = 'Avatar only supports jpg, jpeg and png files.';

	export const EmailSchema = yup.string().email();
	export const PasswordSchema = yup.string();
	export const PhoneSchema = yup.string().matches(PHONE_REGEXP, PHONE_MESSAGE);
	export const NameSchema = yup.string();
	export const SurnameSchema = yup.string();
	export const BirthdateSchema = yup.string();
	export const CountrySchema = yup.string();
	export const TimezoneSchema = yup.string();
	export const AvatarSchema = yup.string().url().matches(AVATAR_REGEXP, AVATAR_MESSAGE);

	export const RefreshTokenSchema = yup.string();
	export const CodeSchema = yup.string();
}

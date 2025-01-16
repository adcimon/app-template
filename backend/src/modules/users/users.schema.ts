import * as yup from 'yup';
import { ValidationSchema } from '../../validation/validation.schema';

export namespace UsersSchema {
	export const UpdateMyUserBody = yup.object().shape({
		name: ValidationSchema.NameSchema.required('Name is required'),
		surname: ValidationSchema.SurnameSchema.notRequired(),
		birthdate: ValidationSchema.BirthdateSchema.notRequired(),
		country: ValidationSchema.CountrySchema.notRequired(),
		timezone: ValidationSchema.TimezoneSchema.notRequired(),
	});

	export const UpdateMyEmailBody = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
	});

	export const UpdateMyPhoneBody = yup.object().shape({
		phone: ValidationSchema.PhoneSchema.notRequired(),
	});

	export const UpdateMyAvatarBody = yup.object().shape({
		avatar: ValidationSchema.AvatarSchema.notRequired(),
	});
}

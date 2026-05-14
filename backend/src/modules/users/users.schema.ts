import * as yup from 'yup';
import { ValidationSchema } from '../../validation/validation.schema.js';

export namespace UsersSchema {
	export const UpdateUserBody = yup.object().shape({
		name: ValidationSchema.NameSchema.required('Name is required'),
		surname: ValidationSchema.SurnameSchema.notRequired(),
		birthdate: ValidationSchema.BirthdateSchema.notRequired(),
		locale: ValidationSchema.LocaleSchema.notRequired(),
		timezone: ValidationSchema.TimezoneSchema.notRequired(),
	});

	export const UpdateEmailBody = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
	});

	export const UpdatePhoneBody = yup.object().shape({
		phone: ValidationSchema.PhoneSchema.notRequired(),
	});

	export const UpdateIconBody = yup.object().shape({
		icon: ValidationSchema.IconSchema.notRequired(),
	});
}

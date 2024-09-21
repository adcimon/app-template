import * as yup from 'yup';
import { ValidationSchema } from '../../validation/validation.schema';

export namespace UsersSchema {
	export const UpdateMyUserSchema = yup.object().shape({
		name: ValidationSchema.NameSchema.required('Name is required'),
		surname: ValidationSchema.SurnameSchema.notRequired(),
		birthdate: ValidationSchema.BirthdateSchema.notRequired(),
		country: ValidationSchema.CountrySchema.notRequired(),
		timezone: ValidationSchema.TimezoneSchema.notRequired(),
	});

	export const UpdateMyEmailSchema = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
	});

	export const UpdateMyPhoneSchema = yup.object().shape({
		phone: ValidationSchema.PhoneSchema.notRequired(),
	});

	export const UpdateMyPasswordSchema = yup.object().shape({
		currentPassword: ValidationSchema.PasswordSchema.required('Current password is required'),
		newPassword: ValidationSchema.PasswordSchema.required('New password is required'),
	});

	export const UpdateMyAvatarSchema = yup.object().shape({
		avatar: ValidationSchema.AvatarSchema.notRequired(),
	});
}

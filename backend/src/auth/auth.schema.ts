import * as yup from 'yup';
import { ValidationSchema } from '../validation/validation.schema';

export namespace AuthSchema {
	export const SignUpSchema = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
		password: ValidationSchema.PasswordSchema.required('Password is required'),
	});

	export const SignDownSchema = yup.object().shape({
		password: ValidationSchema.PasswordSchema.required('Password is required'),
	});

	export const SignInSchema = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
		password: ValidationSchema.PasswordSchema.required('Password is required'),
	});

	export const SignOutSchema = yup.object().shape({});

	export const RefreshTokenSchema = yup.object().shape({
		refreshToken: ValidationSchema.RefreshTokenSchema.required('Refresh token is required'),
	});

	export const VerifyEmailSchema = yup.object().shape({
		code: ValidationSchema.CodeSchema.required('Code is required'),
	});

	export const ForgotPasswordSchema = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
	});

	export const ChangePasswordSchema = yup.object().shape({
		email: ValidationSchema.EmailSchema.required('Email is required'),
		code: ValidationSchema.CodeSchema.required('Code is required'),
		password: ValidationSchema.PasswordSchema.required('Password is required'),
	});
}

import { ConfirmPasswordDto, ForgotPasswordDto } from '../../api/api';

export type ForgotPasswordDfo = Partial<ForgotPasswordDto> &
	Partial<ConfirmPasswordDto> & {
		confirmPassword?: string;
	};

export const newForgotPasswordDfo = (): ForgotPasswordDfo => ({
	email: '',
	code: '',
	password: '',
	confirmPassword: '',
});

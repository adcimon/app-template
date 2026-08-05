import { ChangePasswordDto } from '../../api/api';

export type ChangePasswordDfo = Partial<ChangePasswordDto> & {
	confirmPassword?: string;
};

export const newChangePasswordDfo = (): ChangePasswordDfo => ({
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
});

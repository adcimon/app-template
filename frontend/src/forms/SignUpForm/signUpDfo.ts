import { SignUpDto } from '../../api/api';

export type SignUpDfo = Partial<SignUpDto> & {
	confirmPassword?: string;
	legalAccepted?: boolean;
};

export const newSignUpDfo = (): SignUpDfo => ({
	email: '',
	password: '',
	confirmPassword: '',
	legalAccepted: false,
});

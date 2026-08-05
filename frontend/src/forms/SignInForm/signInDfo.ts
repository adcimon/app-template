import { SignInDto } from '../../api/api';

export type SignInDfo = Partial<SignInDto>;

export const newSignInDfo = (): SignInDfo => ({
	email: '',
	password: '',
});

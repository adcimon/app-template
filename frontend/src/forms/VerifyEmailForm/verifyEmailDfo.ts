import { VerifyEmailDto } from '../../api/api';

export type VerifyEmailDfo = Partial<VerifyEmailDto>;

export const newVerifyEmailDfo = (): VerifyEmailDfo => ({
	code: '',
});

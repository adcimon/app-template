import { SignDownDto } from '../../api/api';

export type SignDownDfo = Partial<SignDownDto>;

export const newSignDownDfo = (): SignDownDfo => ({
	password: '',
});

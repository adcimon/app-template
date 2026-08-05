import { UpdateEmailDto } from '../../api/api';

export type ChangeEmailDfo = Partial<UpdateEmailDto>;

export const newChangeEmailDfo = (): ChangeEmailDfo => ({
	email: '',
});

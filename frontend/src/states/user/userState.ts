import * as Recoil from 'recoil';
import { User } from '../../model/api/user';

export const UserState = Recoil.atom<User | undefined>({
	key: 'User',
	default: undefined,
});

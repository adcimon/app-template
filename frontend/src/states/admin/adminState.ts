import * as Recoil from 'recoil';
import { User } from '../../model/user';

export const UsersState = Recoil.atom<User[]>({
	key: 'Users',
	default: [],
});

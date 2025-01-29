import * as Recoil from 'recoil';
import { UserDto } from '../../dtos/userDto';

export const UserState = Recoil.atom<UserDto | undefined>({
	key: 'User',
	default: undefined,
});

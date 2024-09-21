import * as Recoil from 'recoil';

export const UsersState = Recoil.atom<any[]>({
	key: 'Users',
	default: [],
});

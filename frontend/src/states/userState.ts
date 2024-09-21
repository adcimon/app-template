import * as Recoil from 'recoil';

export const UserState = Recoil.atom<any>({
	key: 'User',
	default: {},
});

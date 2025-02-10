import * as Recoil from 'recoil';

export const ThemeState = Recoil.atom<number>({
	key: 'Theme',
	default: 0,
});

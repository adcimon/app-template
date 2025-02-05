import * as Recoil from 'recoil';

export const AppThemeState = Recoil.atom<number>({
	key: 'AppTheme',
	default: 0,
});

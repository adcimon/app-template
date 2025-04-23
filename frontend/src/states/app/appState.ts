import * as Recoil from 'recoil';

export const MetadataState = Recoil.atom<any>({
	key: 'MetadataState',
	default: {},
});

export const ThemeState = Recoil.atom<number>({
	key: 'Theme',
	default: 0,
});

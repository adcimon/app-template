import * as Recoil from 'recoil';
import { AuthMode } from '../../types/authMode';
import { ViewType } from '../../types/viewType';

export const AppViewState = Recoil.atom<ViewType>({
	key: 'AppView',
	default: ViewType.SignIn,
});

export const AuthModeState = Recoil.atom<AuthMode>({
	key: 'AuthMode',
	default: AuthMode.Signed,
});

export const AppThemeState = Recoil.atom<number>({
	key: 'AppTheme',
	default: 0,
});

export const AppErrorState = Recoil.atom<Error | undefined>({
	key: 'AppError',
	default: undefined,
});

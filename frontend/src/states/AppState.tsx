import { atom } from 'recoil';
import { IApiClient } from '../api/apiClient';

export enum AppViewType {
	SignIn,
	SignUp,
	ForgotPassword,
	Main,
}

export type AppStateType = {
	apiClient: IApiClient | null;
	appView: AppViewType;
	theme: number;
	error: Error | null;
	user: any;
};

export const defaultAppState = {
	apiClient: null,
	appView: AppViewType.SignIn,
	theme: 0,
	error: null,
	user: {},
};

export const resetAppState = (appState: AppStateType) => {
	const { apiClient, theme, ...newDefaultAppState } = defaultAppState;
	return {
		apiClient: appState.apiClient,
		theme: appState.theme,
		...newDefaultAppState,
	};
};

export const AppState = atom<AppStateType>({
	key: 'AppState',
	default: defaultAppState,
});

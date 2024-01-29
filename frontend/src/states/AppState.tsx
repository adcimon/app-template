import { atom } from 'recoil';
import { IBackendClient } from '../components/BackendManager/IBackendClient';

export enum AppViewType {
	SignIn,
	SignUp,
	ForgotPassword,
	Main,
}

export type AppStateType = {
	backendClient: IBackendClient | null;
	appView: AppViewType;
	theme: number;
	error: Error | null;
	user: any;
};

export const defaultAppState = {
	backendClient: null,
	appView: AppViewType.SignIn,
	theme: 0,
	error: null,
	user: {},
};

export const resetAppState = (appState: AppStateType) => {
	const { backendClient, theme, ...newDefaultAppState } = defaultAppState;
	return {
		backendClient: appState.backendClient,
		theme: appState.theme,
		...newDefaultAppState,
	};
};

export const AppState = atom<AppStateType>({
	key: 'AppState',
	default: defaultAppState,
});

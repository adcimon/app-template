import * as Recoil from 'recoil';
import { UserDto } from '../../dtos/userDto';
import { Transforms } from '../../dtos/transforms/transforms';
import { useApiState } from '../api/useApiState';
import { AppErrorState, AppThemeState, AppViewState, AuthModeState } from './appState';
import { AuthMode } from '../../types/authMode';
import { ViewType } from '../../types/viewType';

export function useAppState() {
	const apiState = useApiState();

	const [appView, setAppView] = Recoil.useRecoilState(AppViewState);
	const [authMode, setAuthMode] = Recoil.useRecoilState(AuthModeState);
	const [theme, setTheme] = Recoil.useRecoilState(AppThemeState);
	const [error, setError] = Recoil.useRecoilState(AppErrorState);

	const signUp = async (email: string, password: string): Promise<any> => {
		const user: any = await apiState.client?.authService.signUp(email, password);
		return user;
	};

	const signDown = async (password: string): Promise<any> => {
		const user: any = await apiState.client?.authService.signDown(password);
		return user;
	};

	const signIn = async (email: string, password: string): Promise<any> => {
		const credentials: any = await apiState.client?.authService.signIn(email, password);
		return credentials;
	};

	const signOut = async (): Promise<boolean> => {
		const status: any = await apiState.client?.authService.signOut();
		return status.status;
	};

	const verifyEmail = async (code: string): Promise<boolean> => {
		const status: any = await apiState.client?.authService.verifyEmail(code);
		return status.status;
	};

	const forgotPassword = async (email: string): Promise<boolean> => {
		const status: any = await apiState.client?.authService.forgotPassword(email);
		return status.status;
	};

	const confirmPassword = async (email: string, code: string, password: string): Promise<boolean> => {
		const status: any = await apiState.client?.authService.confirmPassword(email, code, password);
		return status.status;
	};

	const changePassword = async (currentPassword: string, newPassword: string): Promise<UserDto> => {
		const user: any = await apiState.client?.authService.changePassword(currentPassword, newPassword);
		const dto: UserDto = Transforms.ApiToDto.User(user);
		return dto;
	};

	const reset = () => {
		setAppView(ViewType.SignIn);
		setAuthMode(AuthMode.Signed);
		setError(undefined);
		apiState.client?.cancelRequests();
	};

	return {
		appView,
		authMode,
		theme,
		error,
		setAppView,
		setAuthMode,
		setTheme,
		setError,
		signUp,
		signDown,
		signIn,
		signOut,
		verifyEmail,
		forgotPassword,
		confirmPassword,
		changePassword,
		reset,
	};
}

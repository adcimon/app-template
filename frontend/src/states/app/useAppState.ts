import * as Recoil from 'recoil';
import { UserDto } from '../../dtos/userDto';
import { Transforms } from '../../dtos/transforms/transforms';
import { useApiState } from '../api/useApiState';
import { AppThemeState } from './appState';

export function useAppState() {
	const apiState = useApiState();

	const [theme, setTheme] = Recoil.useRecoilState(AppThemeState);

	const signUp = async (email: string, password: string): Promise<any> => {
		const user: any = await apiState.client?.authService.signUp(email, password);
		return user;
	};

	const signDown = async (password: string): Promise<any> => {
		const user: any = await apiState.client?.authService.signDown(password);

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return user;
	};

	const signIn = async (email: string, password: string): Promise<any> => {
		const credentials: any = await apiState.client?.authService.signIn(email, password);

		const accessToken: string = credentials.accessToken;
		localStorage.setItem('accessToken', accessToken);
		const refreshToken: string = credentials.refreshToken;
		localStorage.setItem('refreshToken', refreshToken);

		return credentials;
	};

	const signOut = async (): Promise<boolean> => {
		const status: any = await apiState.client?.authService.signOut();

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

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
		apiState.client?.cancelRequests();
	};

	return {
		theme,
		setTheme,
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

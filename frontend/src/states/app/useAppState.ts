import * as Recoil from 'recoil';
import { User } from '../../model/user';
import { Transforms } from '../../model/transforms/transforms';
import { useApiState } from '../api/useApiState';
import { ThemeState } from './appState';

export function useAppState() {
	const apiState = useApiState();

	const [theme, setTheme] = Recoil.useRecoilState(ThemeState);

	const signUp = async (email: string, password: string): Promise<any> => {
		const dto: any = await apiState.client?.authService.signUp(email, password);
		const user: User = Transforms.Dto.User(dto);
		return user;
	};

	const signDown = async (password: string): Promise<any> => {
		const dto: any = await apiState.client?.authService.signDown(password);
		const user: User = Transforms.Dto.User(dto);

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return user;
	};

	const signIn = async (email: string, password: string): Promise<any> => {
		const dto: any = await apiState.client?.authService.signIn(email, password);

		const accessToken: string = dto.accessToken;
		localStorage.setItem('accessToken', accessToken);
		const refreshToken: string = dto.refreshToken;
		localStorage.setItem('refreshToken', refreshToken);

		return dto;
	};

	const signOut = async (): Promise<boolean> => {
		const dto: any = await apiState.client?.authService.signOut();

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return dto.status;
	};

	const verifyEmail = async (code: string): Promise<boolean> => {
		const dto: any = await apiState.client?.authService.verifyEmail(code);
		return dto.status;
	};

	const forgotPassword = async (email: string): Promise<boolean> => {
		const dto: any = await apiState.client?.authService.forgotPassword(email);
		return dto.status;
	};

	const confirmPassword = async (email: string, code: string, password: string): Promise<boolean> => {
		const dto: any = await apiState.client?.authService.confirmPassword(email, code, password);
		return dto.status;
	};

	const changePassword = async (currentPassword: string, newPassword: string): Promise<User> => {
		const dto: any = await apiState.client?.authService.changePassword(currentPassword, newPassword);
		const user: User = Transforms.Dto.User(dto);
		return user;
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

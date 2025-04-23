import * as Recoil from 'recoil';
import { Status } from '../../model/api/status';
import { Credentials } from '../../model/api/credentials';
import { User } from '../../model/api/user';
import { useApiState } from '../api/useApiState';
import { MetadataState, ThemeState } from './appState';

export function useAppState() {
	const apiState = useApiState();

	const [metadata, setMetadata] = Recoil.useRecoilState(MetadataState);
	const [theme, setTheme] = Recoil.useRecoilState(ThemeState);

	const signUp = async (email: string, password: string): Promise<User> => {
		const user: User = await apiState.client?.authService.signUp(email, password);
		return user;
	};

	const signDown = async (password: string): Promise<User> => {
		const user: User = await apiState.client?.authService.signDown(password);

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return user;
	};

	const signIn = async (email: string, password: string): Promise<Credentials> => {
		const credentials: Credentials = await apiState.client?.authService.signIn(email, password);

		const accessToken: string = credentials.accessToken;
		localStorage.setItem('accessToken', accessToken);
		const refreshToken: string = credentials.refreshToken;
		localStorage.setItem('refreshToken', refreshToken);

		return credentials;
	};

	const signOut = async (): Promise<boolean> => {
		const status: Status = await apiState.client?.authService.signOut();

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return status.status;
	};

	const verifyEmail = async (code: string): Promise<boolean> => {
		const status: Status = await apiState.client?.authService.verifyEmail(code);
		return status.status;
	};

	const forgotPassword = async (email: string): Promise<boolean> => {
		const status: Status = await apiState.client?.authService.forgotPassword(email);
		return status.status;
	};

	const confirmPassword = async (email: string, code: string, password: string): Promise<boolean> => {
		const status: Status = await apiState.client?.authService.confirmPassword(email, code, password);
		return status.status;
	};

	const changePassword = async (currentPassword: string, newPassword: string): Promise<User> => {
		const user: User = await apiState.client?.authService.changePassword(currentPassword, newPassword);
		return user;
	};

	const reset = () => {
		apiState.client?.cancelRequests();
	};

	return {
		metadata,
		theme,
		setMetadata,
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

import { useAtom } from 'jotai';
import { Status } from '../../model/api/status';
import { Credentials } from '../../model/api/credentials';
import { User } from '../../model/api/user';
import { useApi } from '../../clients/api/apiContext';
import { MetadataState, ThemeState } from './appState';

export function useAppState() {
	const api = useApi();

	const [metadata, setMetadata] = useAtom(MetadataState);
	const [theme, setTheme] = useAtom(ThemeState);

	const signUp = async (email: string, password: string): Promise<User> => {
		const user: User = await api.client?.authService.signUp(email, password);
		return user;
	};

	const signDown = async (password: string): Promise<boolean> => {
		const status: Status = await api.client?.authService.signDown(password);

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return status.status;
	};

	const signIn = async (email: string, password: string): Promise<Credentials> => {
		const credentials: Credentials = await api.client?.authService.signIn(email, password);

		const accessToken: string = credentials.accessToken;
		localStorage.setItem('accessToken', accessToken);
		const refreshToken: string = credentials.refreshToken;
		localStorage.setItem('refreshToken', refreshToken);

		return credentials;
	};

	const signOut = async (): Promise<boolean> => {
		const status: Status = await api.client?.authService.signOut();

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return status.status;
	};

	const verifyEmail = async (code: string): Promise<boolean> => {
		const status: Status = await api.client?.authService.verifyEmail(code);
		return status.status;
	};

	const forgotPassword = async (email: string): Promise<boolean> => {
		const status: Status = await api.client?.authService.forgotPassword(email);
		return status.status;
	};

	const confirmPassword = async (email: string, code: string, password: string): Promise<boolean> => {
		const status: Status = await api.client?.authService.confirmPassword(email, code, password);
		return status.status;
	};

	const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
		const status: Status = await api.client?.authService.changePassword(currentPassword, newPassword);
		return status.status;
	};

	const reset = () => {
		api.client?.cancelRequests();
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

import { useAtom } from 'jotai';
import {
	AppCredentials,
	ChangePasswordDto,
	ConfirmPasswordDto,
	ForgotPasswordDto,
	SignDownDto,
	SignInDto,
	SignUpDto,
	Status,
	User,
	VerifyEmailDto,
} from '../../api/api';
import { ChangePasswordDfo } from '../../forms/ChangePasswordForm/changePasswordDfo';
import { ForgotPasswordDfo } from '../../forms/ForgotPasswordForm/forgotPasswordDfo';
import { SignDownDfo } from '../../forms/SignDownForm/signDownDfo';
import { SignInDfo } from '../../forms/SignInForm/signInDfo';
import { SignUpDfo } from '../../forms/SignUpForm/signUpDfo';
import { VerifyEmailDfo } from '../../forms/VerifyEmailForm/verifyEmailDfo';
import { useApi } from '../../clients/api/useApi';
import { CryptoUtils } from '../../utils/cryptoUtils';
import { MetadataState, ThemeState } from './appState';

export function useAppState() {
	const api = useApi();

	const [metadata, setMetadata] = useAtom(MetadataState);
	const [theme, setTheme] = useAtom(ThemeState);

	const signUp = async (form: SignUpDfo): Promise<User> => {
		const body: SignUpDto = {
			email: form.email ?? '',
			password: CryptoUtils.encodeBase64(form.password ?? ''),
		};
		const user: User = await api.client.services.auth.signUp(body);
		return user;
	};

	const signDown = async (form: SignDownDfo): Promise<boolean> => {
		const body: SignDownDto = {
			password: CryptoUtils.encodeBase64(form.password ?? ''),
		};
		const status: Status = await api.client.services.auth.signDown(body);
		api.clearTokens();
		return status.status;
	};

	const signIn = async (form: SignInDfo): Promise<AppCredentials> => {
		const body: SignInDto = {
			email: form.email ?? '',
			password: CryptoUtils.encodeBase64(form.password ?? ''),
		};
		const credentials: AppCredentials = await api.client.services.auth.signIn(body);

		const accessToken: string = credentials.accessToken;
		const refreshToken: string = credentials.refreshToken;

		api.setAccessToken(accessToken);
		api.setRefreshToken(refreshToken);

		return credentials;
	};

	const signOut = async (): Promise<boolean> => {
		const status: Status = await api.client.services.auth.signOut();
		api.clearTokens();
		return status.status;
	};

	const verifyEmail = async (form: VerifyEmailDfo): Promise<boolean> => {
		const body: VerifyEmailDto = { code: form.code ?? '' };
		const status: Status = await api.client.services.auth.verifyEmail(body);
		return status.status;
	};

	const forgotPassword = async (form: ForgotPasswordDfo): Promise<boolean> => {
		const body: ForgotPasswordDto = { email: form.email ?? '' };
		const status: Status = await api.client.services.auth.forgotPassword(body);
		return status.status;
	};

	const confirmPassword = async (form: ForgotPasswordDfo): Promise<boolean> => {
		const body: ConfirmPasswordDto = {
			email: form.email ?? '',
			code: form.code ?? '',
			password: CryptoUtils.encodeBase64(form.password ?? ''),
		};
		const status: Status = await api.client.services.auth.confirmPassword(body);
		return status.status;
	};

	const changePassword = async (form: ChangePasswordDfo): Promise<boolean> => {
		const body: ChangePasswordDto = {
			currentPassword: CryptoUtils.encodeBase64(form.currentPassword ?? ''),
			newPassword: CryptoUtils.encodeBase64(form.newPassword ?? ''),
		};
		const status: Status = await api.client.services.auth.changePassword(body);
		return status.status;
	};

	const reset = () => {
		api.client.cancelRequests();
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

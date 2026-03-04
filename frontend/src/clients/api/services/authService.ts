import { ApiClient } from '../apiClient';
import { CryptoUtils } from '../../../utils/cryptoUtils';

export class AuthService {
	constructor(private api: ApiClient) {}

	public signUp = async (email: string, password: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/sign-up',
			data: {
				email,
				password: CryptoUtils.encodeBase64(password),
			},
		});
	};

	public signDown = async (password: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/sign-down',
			data: {
				password: CryptoUtils.encodeBase64(password),
			},
			useAuthorization: true,
		});
	};

	public signIn = async (email: string, password: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/sign-in',
			data: {
				email,
				password: CryptoUtils.encodeBase64(password),
			},
		});
	};

	public signOut = async (): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/sign-out',
			data: {},
			useAuthorization: true,
		});
	};

	public refreshToken = async (refreshToken: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/refresh-token',
			data: {
				refreshToken,
			},
		});
	};

	public verifyEmail = async (code: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/verify-email',
			data: {
				code,
			},
			useAuthorization: true,
		});
	};

	public forgotPassword = async (email: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/forgot-password',
			data: {
				email,
			},
		});
	};

	public confirmPassword = async (email: string, code: string, password: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/confirm-password',
			data: {
				email,
				code,
				password: CryptoUtils.encodeBase64(password),
			},
		});
	};

	public changePassword = async (currentPassword: string, newPassword: string): Promise<any> => {
		return this.api.post({
			endpoint: '/auth/change-password',
			data: {
				currentPassword: CryptoUtils.encodeBase64(currentPassword),
				newPassword: CryptoUtils.encodeBase64(newPassword),
			},
			useAuthorization: true,
		});
	};
}

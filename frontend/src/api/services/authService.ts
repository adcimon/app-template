import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from '../httpMethods';

export class AuthService {
	httpGet: HttpGet;
	httpPost: HttpPost;
	httpPatch: HttpPatch;
	httpPut: HttpPut;
	httpDelete: HttpDelete;

	constructor(httpGet: HttpGet, httpPost: HttpPost, httpPatch: HttpPatch, httpPut: HttpPut, httpDelete: HttpDelete) {
		this.httpGet = httpGet;
		this.httpPost = httpPost;
		this.httpPatch = httpPatch;
		this.httpPut = httpPut;
		this.httpDelete = httpDelete;
	}

	public signUp = async (email: string, password: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/sign-up',
			data: {
				email,
				password: btoa(password),
			},
		});
	};

	public signDown = async (password: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/sign-down',
			data: {
				password: btoa(password),
			},
			useAuthorization: true,
		});
	};

	public signIn = async (email: string, password: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/sign-in',
			data: {
				email,
				password: btoa(password),
			},
		});
	};

	public signOut = async (): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/sign-out',
			useAuthorization: true,
		});
	};

	public refreshToken = async (refreshToken: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/refresh-token',
			data: {
				refreshToken,
			},
		});
	};

	public verifyEmail = async (code: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/verify-email',
			data: {
				code,
			},
			useAuthorization: true,
		});
	};

	public forgotPassword = async (email: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/forgot-password',
			data: {
				email,
			},
		});
	};

	public confirmPassword = async (email: string, code: string, password: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/confirm-password',
			data: {
				email,
				code,
				password: btoa(password),
			},
		});
	};

	public changePassword = async (currentPassword: string, newPassword: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/change-password',
			data: {
				currentPassword: btoa(currentPassword),
				newPassword: btoa(newPassword),
			},
			useAuthorization: true,
		});
	};
}

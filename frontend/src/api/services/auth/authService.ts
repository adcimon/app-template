import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from '../../httpMethods';

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

	signUp = async (email: string, password: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/sign-up',
			data: {
				email,
				password: btoa(password),
			},
		});
	};

	signDown = async (password: string): Promise<any> => {
		const response: any = await this.httpPost({
			endpoint: '/auth/sign-down',
			data: {
				password: btoa(password),
			},
			useAuthorization: true,
		});

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return response;
	};

	signIn = async (email: string, password: string): Promise<any> => {
		const response: any = await this.httpPost({
			endpoint: '/auth/sign-in',
			data: {
				email,
				password: btoa(password),
			},
		});

		const accessToken: string = response.accessToken;
		localStorage.setItem('accessToken', accessToken);
		const refreshToken: string = response.refreshToken;
		localStorage.setItem('refreshToken', refreshToken);

		return response;
	};

	signOut = async (): Promise<any> => {
		const response: any = await this.httpPost({
			endpoint: '/auth/sign-out',
			useAuthorization: true,
		});

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');

		return response;
	};

	refreshToken = async (): Promise<any> => {
		const response: any = await this.httpPost({
			endpoint: '/auth/refresh-token',
			data: {
				refreshToken: localStorage.getItem('refreshToken'),
			},
		});

		const accessToken: string = response.accessToken;
		localStorage.setItem('accessToken', accessToken);

		return response;
	};

	verifyEmail = async (code: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/verify-email',
			data: {
				code,
			},
			useAuthorization: true,
		});
	};

	forgotPassword = async (email: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/forgot-password',
			data: {
				email,
			},
		});
	};

	confirmPassword = async (email: string, code: string, password: string): Promise<any> => {
		return this.httpPost({
			endpoint: '/auth/confirm-password',
			data: {
				email,
				code,
				password: btoa(password),
			},
		});
	};

	changePassword = async (currentPassword: string, newPassword: string): Promise<any> => {
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

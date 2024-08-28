import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from '../httpMethods';

export interface IAuthService {
	signUp(email: string, password: string): Promise<any>;
	signDown(password: string): Promise<any>;
	signIn(email: string, password: string): Promise<any>;
	signOut(): Promise<any>;
	refreshToken(): Promise<any>;
	forgotPassword(email: string): Promise<any>;
	changePassword(email: string, code: string, password: string): Promise<any>;
	verifyEmail(code: string): Promise<any>;
}

export const newAuthService = (
	httpGet: HttpGet,
	httpPost: HttpPost,
	httpPatch: HttpPatch,
	httpPut: HttpPut,
	httpDelete: HttpDelete,
): IAuthService => {
	return {
		signUp: async (email: string, password: string): Promise<any> => {
			return httpPost({
				endpoint: '/auth/signup',
				data: {
					email,
					password: btoa(password),
				},
			});
		},
		signDown: async (password: string): Promise<any> => {
			const response: any = await httpPost({
				endpoint: '/auth/signdown',
				data: {
					password: btoa(password),
				},
				useAuthorization: true,
			});

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			return response;
		},
		signIn: async (email: string, password: string): Promise<any> => {
			const response: any = await httpPost({
				endpoint: '/auth/signin',
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
		},
		signOut: async (): Promise<any> => {
			const response: any = await httpPost({
				endpoint: '/auth/signout',
				useAuthorization: true,
			});

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			return response;
		},
		refreshToken: async (): Promise<any> => {
			const response: any = await httpPost({
				endpoint: '/auth/refresh-token',
				data: {
					refreshToken: localStorage.getItem('refreshToken'),
				},
			});

			const accessToken: string = response.accessToken;
			localStorage.setItem('accessToken', accessToken);

			return response;
		},
		forgotPassword: async (email: string): Promise<any> => {
			return httpPost({
				endpoint: '/auth/forgot-password',
				data: {
					email,
				},
			});
		},
		changePassword: async (email: string, code: string, password: string): Promise<any> => {
			return httpPost({
				endpoint: '/auth/change-password',
				data: {
					email,
					code,
					password: btoa(password),
				},
			});
		},
		verifyEmail: async (code: string): Promise<any> => {
			return httpPost({
				endpoint: '/auth/verify-email',
				data: {
					code,
				},
				useAuthorization: true,
			});
		},
	};
};

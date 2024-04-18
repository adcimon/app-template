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
			return httpPost(
				'/auth/signup',
				{
					email,
					password: btoa(password),
				},
				false,
			);
		},
		signDown: async (password: string): Promise<any> => {
			const response: any = await httpPost(
				'/auth/signdown',
				{
					password: btoa(password),
				},
				true,
			);

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			return response;
		},
		signIn: async (email: string, password: string): Promise<any> => {
			const response: any = await httpPost(
				'/auth/signin',
				{
					email,
					password: btoa(password),
				},
				false,
			);

			const accessToken: string = response.accessToken;
			localStorage.setItem('accessToken', accessToken);
			const refreshToken: string = response.refreshToken;
			localStorage.setItem('refreshToken', refreshToken);

			return response;
		},
		signOut: async (): Promise<any> => {
			const response: any = await httpPost('/auth/signout', {}, true);

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			return response;
		},
		refreshToken: async (): Promise<any> => {
			const response: any = await httpPost(
				'/auth/refresh-token',
				{
					refreshToken: localStorage.getItem('refreshToken'),
				},
				false,
			);

			const accessToken: string = response.accessToken;
			localStorage.setItem('accessToken', accessToken);

			return response;
		},
		forgotPassword: async (email: string): Promise<any> => {
			return httpPost(
				'/auth/forgot-password',
				{
					email,
				},
				false,
			);
		},
		changePassword: async (email: string, code: string, password: string): Promise<any> => {
			return httpPost(
				'/auth/change-password',
				{
					email,
					code,
					password: btoa(password),
				},
				false,
			);
		},
		verifyEmail: async (code: string): Promise<any> => {
			return httpPost(
				'/auth/verify-email',
				{
					code,
				},
				true,
			);
		},
	};
};

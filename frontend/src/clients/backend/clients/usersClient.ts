import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from '../httpMethods';

export interface IUsersClient {
	getUsers(): Promise<any>;
	getMyUser(): Promise<any>;
	updateMyUser(params?: {
		name?: string;
		surname?: string;
		birthdate?: string;
		country?: string;
		timezone?: string;
	}): Promise<any>;
	updateMyEmail(email: string): Promise<any>;
	updateMyPhone(phone: string): Promise<any>;
	updateMyPassword(currentPassword: string, newPassword: string): Promise<any>;
	updateMyAvatar(avatar: string): Promise<any>;
}

export const newUsersClient = (
	httpGet: HttpGet,
	httpPost: HttpPost,
	httpPatch: HttpPatch,
	httpPut: HttpPut,
	httpDelete: HttpDelete,
): IUsersClient => {
	return {
		getUsers: async (): Promise<any> => {
			return httpGet('/users', true);
		},
		getMyUser: async (): Promise<any> => {
			return httpGet('/users/me', true);
		},
		updateMyUser: async (params?: {
			name?: string;
			surname?: string;
			birthdate?: string;
			country?: string;
			timezone?: string;
		}): Promise<any> => {
			return httpPatch(
				'/users/me',
				{
					name: params?.name,
					surname: params?.surname,
					birthdate: params?.birthdate,
					country: params?.country,
					timezone: params?.timezone,
				},
				true,
			);
		},
		updateMyEmail: async (email: string): Promise<any> => {
			return httpPatch(
				'/users/me/email',
				{
					email,
				},
				true,
			);
		},
		updateMyPhone: async (phone: string): Promise<any> => {
			return httpPatch(
				'/users/me/phone',
				{
					phone,
				},
				true,
			);
		},
		updateMyPassword: async (currentPassword: string, newPassword: string): Promise<any> => {
			return httpPatch(
				'/users/me/password',
				{
					currentPassword: btoa(currentPassword),
					newPassword: btoa(newPassword),
				},
				true,
			);
		},
		updateMyAvatar: async (avatar: string): Promise<any> => {
			return httpPatch(
				'/users/me/avatar',
				{
					avatar,
				},
				true,
			);
		},
	};
};

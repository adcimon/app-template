import { ApiClient } from '../apiClient';

export class UsersService {
	constructor(private api: ApiClient) {}

	public getMyUser = async (): Promise<any> => {
		return this.api.get({
			endpoint: '/users/me',
			useAuthorization: true,
		});
	};

	public updateMyUser = async (
		params: Partial<{
			name: string;
			surname: string;
			birthdate: string;
			locale: string;
			timezone: string;
		}> = {},
	): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me',
			data: {
				name: params.name,
				surname: params.surname,
				birthdate: params.birthdate,
				locale: params.locale,
				timezone: params.timezone,
			},
			useAuthorization: true,
		});
	};

	public updateMyEmail = async (email: string): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me/email',
			data: {
				email,
			},
			useAuthorization: true,
		});
	};

	public updateMyPhone = async (phone: string): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me/phone',
			data: {
				phone,
			},
			useAuthorization: true,
		});
	};

	public updateMyAvatar = async (avatar: string): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me/avatar',
			data: {
				avatar,
			},
			useAuthorization: true,
		});
	};
}

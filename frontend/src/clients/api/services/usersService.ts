import { ApiClient } from '../apiClient';

export class UsersService {
	constructor(private api: ApiClient) {}

	public getUser = async (): Promise<any> => {
		return this.api.get({
			endpoint: '/users/me',
			useAuthorization: true,
		});
	};

	public updateUser = async (
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

	public updateEmail = async (email: string): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me/email',
			data: {
				email,
			},
			useAuthorization: true,
		});
	};

	public updatePhone = async (phone: string): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me/phone',
			data: {
				phone,
			},
			useAuthorization: true,
		});
	};

	public updateIcon = async (icon: string): Promise<any> => {
		return this.api.patch({
			endpoint: '/users/me/icon',
			data: {
				icon,
			},
			useAuthorization: true,
		});
	};
}

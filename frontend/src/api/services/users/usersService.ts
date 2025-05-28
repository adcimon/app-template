import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from '../../httpMethods';

export class UsersService {
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

	getMyUser = async (): Promise<any> => {
		return this.httpGet({
			endpoint: '/users/me',
			useAuthorization: true,
		});
	};

	updateMyUser = async (
		params: Partial<{
			name: string;
			surname: string;
			birthdate: string;
			locale: string;
			timezone: string;
		}> = {},
	): Promise<any> => {
		return this.httpPatch({
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

	updateMyEmail = async (email: string): Promise<any> => {
		return this.httpPatch({
			endpoint: '/users/me/email',
			data: {
				email,
			},
			useAuthorization: true,
		});
	};

	updateMyPhone = async (phone: string): Promise<any> => {
		return this.httpPatch({
			endpoint: '/users/me/phone',
			data: {
				phone,
			},
			useAuthorization: true,
		});
	};

	updateMyAvatar = async (avatar: string): Promise<any> => {
		return this.httpPatch({
			endpoint: '/users/me/avatar',
			data: {
				avatar,
			},
			useAuthorization: true,
		});
	};
}

import { ApiClient } from '../apiClient';

export class AdminService {
	constructor(private api: ApiClient) {}

	public getUsers = async (): Promise<any> => {
		return this.api.get({
			endpoint: '/users',
			useAuthorization: true,
		});
	};
}

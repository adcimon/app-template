import { ApiService } from '../apiService';
import { User } from '../../../api/api';

export class AdminService extends ApiService {
	public getUsers = async (): Promise<User[]> => {
		return this.api.get<User[]>({
			endpointId: 'Admin/getUsers',
			useAuthorization: true,
		});
	};
}

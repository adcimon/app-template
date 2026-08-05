import { ApiService } from '../apiService';
import { UpdateEmailDto, UpdateIconDto, UpdatePhoneDto, UpdateUserDto, User } from '../../../api/api';

export class UsersService extends ApiService {
	public getUser = async (): Promise<User> => {
		return this.api.get<User>({
			endpointId: 'Users/getUser',
			useAuthorization: true,
		});
	};

	public updateUser = async (body: UpdateUserDto): Promise<User> => {
		return this.api.patch<User>({
			endpointId: 'Users/updateUser',
			body: body,
			useAuthorization: true,
		});
	};

	public updateEmail = async (body: UpdateEmailDto): Promise<User> => {
		return this.api.patch<User>({
			endpointId: 'Users/updateEmail',
			body: body,
			useAuthorization: true,
		});
	};

	public updatePhone = async (body: UpdatePhoneDto): Promise<User> => {
		return this.api.patch<User>({
			endpointId: 'Users/updatePhone',
			body: body,
			useAuthorization: true,
		});
	};

	public updateIcon = async (body: UpdateIconDto): Promise<User> => {
		return this.api.patch<User>({
			endpointId: 'Users/updateIcon',
			body: body,
			useAuthorization: true,
		});
	};
}

import { StatusDto } from '../dtos/status.dto';
import { UserDto } from '../dtos/user.dto';

export interface IUsersService {
	get(filter?: string): Promise<UserDto[]>;
	getByEmail(email: string): Promise<UserDto>;
	getMyUser(accessToken: string): Promise<UserDto>;
	updateMyUser(
		accessToken: string,
		name: string,
		surname: string,
		birthdate: string,
		country: string,
		timezone: string,
	): Promise<UserDto>;
	updateMyEmail(accessToken: string, email: string): Promise<UserDto>;
	updateMyPhone(accessToken: string, phone: string): Promise<UserDto>;
	updateMyPassword(accessToken: string, currentPassword: string, newPassword: string): Promise<UserDto>;
	updateMyAvatar(accessToken: string, avatar: string): Promise<UserDto>;
	deleteMyUser(accessToken: string): Promise<StatusDto>;
}

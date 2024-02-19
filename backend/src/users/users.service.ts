import { Injectable } from '@nestjs/common';
import { CognitoService } from '../cognito/cognito.service';
import { StatusDto } from '../dtos/status.dto';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly cognitoService: CognitoService) {}

	public async get(filter?: string): Promise<UserDto[]> {
		const users: UserDto[] = await this.cognitoService.get(filter);
		return users;
	}

	public async getByEmail(email: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.getByEmail(email);
		return user;
	}

	public async getMyUser(accessToken: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.getMyUser(accessToken);
		return user;
	}

	public async updateMyUser(
		accessToken: string,
		params?: {
			name: string;
			surname: string;
			birthdate: string;
			country: string;
			timezone: string;
		},
	): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateMyUser(accessToken, params);
		return user;
	}

	public async updateMyEmail(accessToken: string, email: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateMyEmail(accessToken, email);
		return user;
	}

	public async updateMyPhone(accessToken: string, phone: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateMyPhone(accessToken, phone);
		return user;
	}

	public async updateMyPassword(accessToken: string, currentPassword: string, newPassword: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateMyPassword(accessToken, currentPassword, newPassword);
		return user;
	}

	public async updateMyAvatar(accessToken: string, avatar: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateMyAvatar(accessToken, avatar);
		return user;
	}

	public async deleteMyUser(accessToken: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.deleteMyUser(accessToken);
		return status;
	}
}

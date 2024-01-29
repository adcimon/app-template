import { Injectable } from '@nestjs/common';
import { IUsersService } from './users.interface';
import { CognitoService } from '../cognito/cognito.service';
import { Transform } from '../decorators/transform.decorator';
import { StatusBooleanToDto } from '../transforms/status-boolean-dto.transform';
import { UserCognitoToDto } from '../transforms/user-cognito-dto.transform';
import { StatusDto } from '../dtos/status.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService implements IUsersService {
	constructor(private readonly cognitoService: CognitoService) {}

	@Transform(UserCognitoToDto)
	public async get(filter?: string): Promise<UserDto[]> {
		return await this.cognitoService.get(filter);
	}

	@Transform(UserCognitoToDto)
	public async getByEmail(email: string): Promise<UserDto> {
		return await this.cognitoService.getByEmail(email);
	}

	@Transform(UserCognitoToDto)
	public async getMyUser(accessToken: string): Promise<UserDto> {
		return await this.cognitoService.getMyUser(accessToken);
	}

	@Transform(UserCognitoToDto)
	public async updateMyUser(
		accessToken: string,
		name: string,
		surname: string,
		birthdate: string,
		country: string,
		timezone: string,
	): Promise<UserDto> {
		return await this.cognitoService.updateMyUser(accessToken, name, surname, birthdate, country, timezone);
	}

	@Transform(UserCognitoToDto)
	public async updateMyEmail(accessToken: string, email: string): Promise<UserDto> {
		return await this.cognitoService.updateMyEmail(accessToken, email);
	}

	@Transform(UserCognitoToDto)
	public async updateMyPhone(accessToken: string, phone: string): Promise<UserDto> {
		return await this.cognitoService.updateMyPhone(accessToken, phone);
	}

	@Transform(UserCognitoToDto)
	public async updateMyPassword(accessToken: string, currentPassword: string, newPassword: string): Promise<UserDto> {
		return await this.cognitoService.updateMyPassword(accessToken, currentPassword, newPassword);
	}

	@Transform(UserCognitoToDto)
	public async updateMyAvatar(accessToken: string, avatar: string): Promise<UserDto> {
		return await this.cognitoService.updateMyAvatar(accessToken, avatar);
	}

	@Transform(StatusBooleanToDto)
	public async deleteMyUser(accessToken: string): Promise<StatusDto> {
		return (await this.cognitoService.deleteMyUser(accessToken)) as any;
	}
}

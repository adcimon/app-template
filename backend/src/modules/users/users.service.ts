import { Injectable } from '@nestjs/common';
import { CognitoService } from '../aws/cognito/cognito.service';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
	constructor(
		// AWS
		private readonly cognitoService: CognitoService,
	) {}

	public async get(id: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.get(id);
		return user;
	}

	public async getBy(filter?: string): Promise<UserDto[]> {
		const users: UserDto[] = await this.cognitoService.getBy(filter);
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

	public async update(
		id: string,
		params?: {
			name: string;
			surname: string;
			birthdate: string;
			country: string;
			timezone: string;
		},
	): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.update(id, params);
		return user;
	}

	public async updateEmail(id: string, email: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateEmail(id, email);
		return user;
	}

	public async updatePhone(id: string, phone: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updatePhone(id, phone);
		return user;
	}

	public async updateAvatar(id: string, avatar: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.updateAvatar(id, avatar);
		return user;
	}
}

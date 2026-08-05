import { Injectable } from '@nestjs/common';
import { CognitoService } from '../aws/cognito/cognito.service.js';
import { User } from './types/user.js';

@Injectable()
export class UsersService {
	constructor(
		// AWS
		private readonly cognitoService: CognitoService,
	) {}

	public async get(id: string): Promise<User> {
		const user: User = await this.cognitoService.get(id);
		return user;
	}

	public async getBy(filter?: string): Promise<User[]> {
		const users: User[] = await this.cognitoService.getBy(filter);
		return users;
	}

	public async getBySub(sub: string): Promise<User> {
		const user: User = await this.cognitoService.getBySub(sub);
		return user;
	}

	public async getByEmail(email: string): Promise<User> {
		const user: User = await this.cognitoService.getByEmail(email);
		return user;
	}

	public async getMyUser(accessToken: string): Promise<User> {
		const user: User = await this.cognitoService.getMyUser(accessToken);
		return user;
	}

	public async update(
		id: string,
		params: Partial<{
			name: string;
			surname: string;
			birthdate: string;
			locale: string;
			timezone: string;
		}> = {},
	): Promise<User> {
		const user: User = await this.cognitoService.update(id, params);
		return user;
	}

	public async updateEmail(id: string, email: string): Promise<User> {
		const user: User = await this.cognitoService.updateEmail(id, email);
		return user;
	}

	public async updatePhone(id: string, phone: string): Promise<User> {
		const user: User = await this.cognitoService.updatePhone(id, phone);
		return user;
	}

	public async updateIcon(id: string, avatar: string): Promise<User> {
		const user: User = await this.cognitoService.updateIcon(id, avatar);
		return user;
	}
}

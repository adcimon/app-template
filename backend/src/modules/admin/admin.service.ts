import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/types/user.js';

@Injectable()
export class AdminService {
	constructor(
		// API
		private readonly usersService: UsersService,
	) {}

	public async getUsers(filter?: string): Promise<User[]> {
		const users: User[] = await this.usersService.getBy(filter);
		return users;
	}
}

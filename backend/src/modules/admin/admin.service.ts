import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/user.dto';

@Injectable()
export class AdminService {
	constructor(private readonly usersService: UsersService) {}

	public async getUsers(filter?: string): Promise<UserDto[]> {
		const users: UserDto[] = await this.usersService.getBy(filter);
		return users;
	}
}

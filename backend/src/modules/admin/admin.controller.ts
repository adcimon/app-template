import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';
import { RolesGuard } from '../../guards/roles.guard.js';
import { ResponseInterceptor } from '../../interceptors/response.interceptor.js';
import { UserDto } from '../users/user.dto.js';
import { AuthMethod } from '../../types/auth-method.js';
import { Role } from '../../types/role.js';

@Controller('')
export class AdminController {
	constructor(private readonly service: AdminService) {}

	@Get('/users')
	@UseGuards(AuthGuard(AuthMethod.Bearer), RolesGuard(Role.Admin))
	@UseInterceptors(ResponseInterceptor)
	async getUsers(): Promise<UserDto[]> {
		return await this.service.getUsers();
	}
}

import { Controller, Get, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';
import { RolesGuard } from '../../guards/roles.guard.js';
import { ResponseInterceptor } from '../../interceptors/response.interceptor.js';
import { ApiResponse } from '../../api/api-response.decorator.js';
import { AuthMethod } from '../../types/auth-method.js';
import { Role } from '../../types/role.js';
import { User } from '../users/types/user.js';

@Controller('')
export class AdminController {
	constructor(private readonly service: AdminService) {}

	@Get('/users')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.OK, type: User, isArray: true })
	@UseGuards(AuthGuard(AuthMethod.Bearer), RolesGuard(Role.Admin))
	@UseInterceptors(ResponseInterceptor)
	public async getUsers(): Promise<User[]> {
		return await this.service.getUsers();
	}
}

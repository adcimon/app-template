import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import { UserDto } from '../users/user.dto';
import { AuthMethod } from '../../types/auth-method';
import { Role } from '../../types/role';

@Controller('')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('/users')
	@UseGuards(AuthGuard(AuthMethod.Bearer), RolesGuard(Role.Admin))
	@UseInterceptors(ResponseInterceptor)
	async getUsers(): Promise<UserDto[]> {
		return await this.adminService.getUsers();
	}
}

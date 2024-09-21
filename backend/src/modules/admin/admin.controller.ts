import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import { UserDto } from '../users/user.dto';

@Controller('')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('/users')
	@UseGuards(AuthGuard)
	@UseInterceptors(ResponseInterceptor)
	async getUsers(): Promise<UserDto[]> {
		return await this.adminService.getUsers();
	}
}

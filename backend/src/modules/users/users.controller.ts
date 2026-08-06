import { Body, Controller, Get, HttpStatus, Patch, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';
import { ResponseInterceptor } from '../../interceptors/response.interceptor.js';
import { ApiResponse } from '../../api/api-response.decorator.js';
import { UpdateUserDto, UpdateEmailDto, UpdatePhoneDto, UpdateIconDto } from './users.dtos.js';
import { AuthMethod } from '../../types/auth-method.js';
import { User } from './types/user.js';

@Controller('users')
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Get('/me')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.OK, type: User })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async getUser(@Request() request): Promise<User> {
		return await this.service.get(request.user.id);
	}

	@Patch('/me')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.OK, type: User })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async updateUser(@Request() request, @Body() body: UpdateUserDto): Promise<User> {
		return await this.service.update(request.user.id, body);
	}

	@Patch('/me/email')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.OK, type: User })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async updateEmail(@Request() request, @Body() body: UpdateEmailDto): Promise<User> {
		return await this.service.updateEmail(request.user.id, body);
	}

	@Patch('/me/phone')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.OK, type: User })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async updatePhone(@Request() request, @Body() body: UpdatePhoneDto): Promise<User> {
		return await this.service.updatePhone(request.user.id, body);
	}

	@Patch('/me/icon')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.OK, type: User })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async updateIcon(@Request() request, @Body() body: UpdateIconDto): Promise<User> {
		return await this.service.updateIcon(request.user.id, body);
	}
}

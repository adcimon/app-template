import { Body, Controller, Get, Patch, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';
import { ResponseInterceptor } from '../../interceptors/response.interceptor.js';
import { ValidationPipe } from '../../validation/validation.pipe.js';
import { UsersSchema } from './users.schema.js';
import { UserDto } from './user.dto.js';
import { AuthMethod } from '../../types/auth-method.js';

@Controller('users')
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Get('/me')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async getMyUser(@Request() request): Promise<UserDto> {
		return await this.service.get(request.user.id);
	}

	@Patch('/me')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async updateMyUser(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyUserBody)) body: any,
	): Promise<UserDto> {
		return await this.service.update(request.user.id, {
			name: body.name,
			surname: body.surname,
			birthdate: body.birthdate,
			locale: body.locale,
			timezone: body.timezone,
		});
	}

	@Patch('/me/email')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async updateMyEmail(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyEmailBody)) body: any,
	): Promise<UserDto> {
		return await this.service.updateEmail(request.user.id, body.email);
	}

	@Patch('/me/phone')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async updateMyPhone(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyPhoneBody)) body: any,
	): Promise<UserDto> {
		return await this.service.updatePhone(request.user.id, body.phone);
	}

	@Patch('/me/avatar')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async updateMyAvatar(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyAvatarBody)) body: any,
	): Promise<UserDto> {
		return await this.service.updateAvatar(request.user.id, body.avatar);
	}
}

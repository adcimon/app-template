import { Controller, Get, Patch, Request, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { PasswordInterceptor } from '../../interceptors/password.interceptor';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import { ValidationPipe } from '../../validation/validation.pipe';
import { UsersSchema } from './users.schema';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/me')
	@UseGuards(AuthGuard)
	@UseInterceptors(ResponseInterceptor)
	async getMyUser(@Request() request): Promise<UserDto> {
		return await this.usersService.getMyUser(request.accessToken);
	}

	@Patch('/me')
	@UseGuards(AuthGuard)
	@UseInterceptors(ResponseInterceptor)
	async updateMyUser(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyUserSchema)) body: any,
	): Promise<UserDto> {
		return await this.usersService.updateMyUser(request.accessToken, {
			name: body.name,
			surname: body.surname,
			birthdate: body.birthdate,
			country: body.country,
			timezone: body.timezone,
		});
	}

	@Patch('/me/email')
	@UseGuards(AuthGuard)
	@UseInterceptors(ResponseInterceptor)
	async updateMyEmail(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyEmailSchema)) body: any,
	): Promise<UserDto> {
		return await this.usersService.updateMyEmail(request.accessToken, body.email);
	}

	@Patch('/me/phone')
	@UseGuards(AuthGuard)
	@UseInterceptors(ResponseInterceptor)
	async updateMyPhone(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyPhoneSchema)) body: any,
	): Promise<UserDto> {
		return await this.usersService.updateMyPhone(request.accessToken, body.phone);
	}

	@Patch('/me/password')
	@UseGuards(AuthGuard)
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	async updateMyPassword(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyPasswordSchema)) body: any,
	): Promise<UserDto> {
		return await this.usersService.updateMyPassword(request.accessToken, body.currentPassword, body.newPassword);
	}

	@Patch('/me/avatar')
	@UseGuards(AuthGuard)
	@UseInterceptors(ResponseInterceptor)
	async updateMyAvatar(
		@Request() request,
		@Body(new ValidationPipe(UsersSchema.UpdateMyAvatarSchema)) body: any,
	): Promise<UserDto> {
		return await this.usersService.updateMyAvatar(request.accessToken, body.avatar);
	}
}

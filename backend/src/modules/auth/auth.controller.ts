import { Controller, Post, Request, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { PasswordInterceptor } from '../../interceptors/password.interceptor';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import { ValidationPipe } from '../../validation/validation.pipe';
import { AuthSchema } from './auth.schema';
import { StatusDto } from '../../dtos/status.dto';
import { CredentialsDto } from './credentials.dto';
import { UserDto } from '../users/user.dto';
import { AuthMethod } from '../../types/auth-method';

@Controller('auth')
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post('/sign-up')
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	async signUp(@Body(new ValidationPipe(AuthSchema.SignUpSchema)) body: any): Promise<UserDto> {
		return await this.service.signUp(body.email, body.password);
	}

	@Post('/sign-down')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	async signDown(
		@Request() request,
		@Body(new ValidationPipe(AuthSchema.SignDownSchema)) body: any,
	): Promise<UserDto> {
		return await this.service.signDown(request.accessToken, body.password);
	}

	@Post('/sign-in')
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	async signIn(@Body(new ValidationPipe(AuthSchema.SignInSchema)) body: any): Promise<CredentialsDto> {
		return await this.service.signIn(body.email, body.password);
	}

	@Post('/sign-out')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async signOut(
		@Request() request,
		@Body(new ValidationPipe(AuthSchema.SignOutSchema)) body: any,
	): Promise<StatusDto> {
		return await this.service.signOut(request.accessToken);
	}

	@Post('/refresh-token')
	@UseInterceptors(ResponseInterceptor)
	async refreshToken(@Body(new ValidationPipe(AuthSchema.RefreshTokenSchema)) body: any): Promise<CredentialsDto> {
		return await this.service.refreshToken(body.refreshToken);
	}

	@Post('/verify-email')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	async verifyEmail(
		@Request() request,
		@Body(new ValidationPipe(AuthSchema.VerifyEmailSchema)) body: any,
	): Promise<StatusDto> {
		return await this.service.verifyEmail(request.accessToken, body.code);
	}

	@Post('/forgot-password')
	@UseInterceptors(ResponseInterceptor)
	async forgotPassword(@Body(new ValidationPipe(AuthSchema.ForgotPasswordSchema)) body: any): Promise<StatusDto> {
		return await this.service.forgotPassword(body.email);
	}

	@Post('/confirm-password')
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	async confirmPassword(@Body(new ValidationPipe(AuthSchema.ConfirmPasswordSchema)) body: any): Promise<StatusDto> {
		return await this.service.confirmPassword(body.email, body.code, body.password);
	}

	@Post('/change-password')
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	async changePassword(
		@Request() request,
		@Body(new ValidationPipe(AuthSchema.ChangePasswordBody)) body: any,
	): Promise<UserDto> {
		return await this.service.changePassword(request.accessToken, body.currentPassword, body.newPassword);
	}
}

import { Body, Controller, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { AuthGuard } from '../../guards/auth.guard.js';
import { PasswordInterceptor } from '../../interceptors/password.interceptor.js';
import { ResponseInterceptor } from '../../interceptors/response.interceptor.js';
import { ApiResponse } from '../../api/api-response.decorator.js';
import { AuthMethod } from '../../types/auth-method.js';
import { AppCredentials } from './types/app-credentials.js';
import { User } from '../users/types/user.js';
import {
	SignUpDto,
	SignDownDto,
	SignInDto,
	RefreshTokenDto,
	VerifyEmailDto,
	ForgotPasswordDto,
	ConfirmPasswordDto,
	ChangePasswordDto,
} from './auth.dtos.js';
import { Status } from '../../types/status.js';

@Controller('auth')
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post('/sign-up')
	@ApiResponse({ status: HttpStatus.CREATED, type: User })
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	public async signUp(@Body() body: SignUpDto): Promise<User> {
		return await this.service.signUp(body);
	}

	@Post('/sign-down')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.CREATED, type: Status })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	public async signDown(@Request() request, @Body() body: SignDownDto): Promise<Status> {
		return await this.service.signDown(request.accessToken, body);
	}

	@Post('/sign-in')
	@ApiResponse({ status: HttpStatus.CREATED, type: AppCredentials })
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	public async signIn(@Body() body: SignInDto): Promise<AppCredentials> {
		return await this.service.signIn(body);
	}

	@Post('/sign-out')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.CREATED, type: Status })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async signOut(@Request() request): Promise<Status> {
		return await this.service.signOut(request.accessToken);
	}

	@Post('/refresh-token')
	@ApiResponse({ status: HttpStatus.CREATED, type: AppCredentials })
	@UseInterceptors(ResponseInterceptor)
	public async refreshToken(@Body() body: RefreshTokenDto): Promise<AppCredentials> {
		return await this.service.refreshToken(body);
	}

	@Post('/verify-email')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.CREATED, type: Status })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(ResponseInterceptor)
	public async verifyEmail(@Request() request, @Body() body: VerifyEmailDto): Promise<Status> {
		return await this.service.verifyEmail(request.accessToken, body);
	}

	@Post('/forgot-password')
	@ApiResponse({ status: HttpStatus.CREATED, type: Status })
	@UseInterceptors(ResponseInterceptor)
	public async forgotPassword(@Body() body: ForgotPasswordDto): Promise<Status> {
		return await this.service.forgotPassword(body);
	}

	@Post('/confirm-password')
	@ApiResponse({ status: HttpStatus.CREATED, type: Status })
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	public async confirmPassword(@Body() body: ConfirmPasswordDto): Promise<Status> {
		return await this.service.confirmPassword(body);
	}

	@Post('/change-password')
	@ApiBearerAuth(AuthMethod.Bearer)
	@ApiResponse({ status: HttpStatus.CREATED, type: Status })
	@UseGuards(AuthGuard(AuthMethod.Bearer))
	@UseInterceptors(PasswordInterceptor, ResponseInterceptor)
	public async changePassword(@Request() request, @Body() body: ChangePasswordDto): Promise<Status> {
		return await this.service.changePassword(request.accessToken, body);
	}
}

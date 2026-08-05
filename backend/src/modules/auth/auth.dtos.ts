import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsRequired } from '../../validation/is-required.decorator.js';

export class SignUpDto {
	@ApiProperty()
	@IsRequired()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsRequired()
	@IsString()
	password: string;
}

export class SignDownDto {
	@ApiProperty()
	@IsRequired()
	@IsString()
	password: string;
}

export class SignInDto {
	@ApiProperty()
	@IsRequired()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsRequired()
	@IsString()
	password: string;
}

export class RefreshTokenDto {
	@ApiProperty()
	@IsRequired()
	@IsString()
	refreshToken: string;
}

export class VerifyEmailDto {
	@ApiProperty()
	@IsRequired()
	@IsString()
	code: string;
}

export class ForgotPasswordDto {
	@ApiProperty()
	@IsRequired()
	@IsEmail()
	email: string;
}

export class ConfirmPasswordDto {
	@ApiProperty()
	@IsRequired()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsRequired()
	@IsString()
	code: string;

	@ApiProperty()
	@IsRequired()
	@IsString()
	password: string;
}

export class ChangePasswordDto {
	@ApiProperty()
	@IsRequired()
	@IsString()
	currentPassword: string;

	@ApiProperty()
	@IsRequired()
	@IsString()
	newPassword: string;
}

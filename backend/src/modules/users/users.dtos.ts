import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsOptional, IsString } from 'class-validator';
import { IsRequired } from '../../validation/is-required.decorator.js';
import { IsName } from '../../validation/is-name.decorator.js';
import { IsPhone } from '../../validation/is-phone.decorator.js';
import { IsIcon } from '../../validation/is-icon.decorator.js';

export class UpdateUserDto {
	@ApiProperty()
	@IsRequired()
	@IsName()
	name: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsName()
	surname?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsISO8601()
	birthdate?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	locale?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	timezone?: string;
}

export class UpdateEmailDto {
	@ApiProperty()
	@IsRequired()
	@IsEmail()
	email: string;
}

export class UpdatePhoneDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsPhone()
	phone?: string;
}

export class UpdateIconDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsIcon()
	icon?: string;
}

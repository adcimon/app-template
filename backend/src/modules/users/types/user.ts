import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../types/role.js';

export class User {
	@ApiProperty()
	id: string = '';

	@ApiProperty()
	name: string = '';

	@ApiProperty()
	surname: string = '';

	@ApiProperty()
	birthdate: string = '';

	@ApiProperty()
	email: string = '';

	@ApiProperty()
	emailVerified: boolean = false;

	@ApiProperty()
	phone: string = '';

	@ApiProperty()
	phoneVerified: boolean = false;

	@ApiProperty()
	locale: string = '';

	@ApiProperty()
	timezone: string = '';

	@ApiProperty()
	icon: string = '';

	@ApiProperty({ enum: Role, isArray: true })
	roles: Role[] = [];
}

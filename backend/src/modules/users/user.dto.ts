export class UserDto {
	id: string;
	name: string;
	surname: string;
	birthdate: string;
	email: string;
	emailVerified: boolean;
	phone: string;
	phoneVerified: boolean;
	locale: string;
	timezone: string;
	avatar: string;
	roles: string[];
}

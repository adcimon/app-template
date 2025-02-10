export class User {
	id: string = '';
	name: string = '';
	surname: string = '';
	birthdate: string = '';
	email: string = '';
	emailVerified: boolean = false;
	phone: string = '';
	phoneVerified: boolean = false;
	country: string = '';
	timezone: string = '';
	avatar: string = '';
	roles: string[] = [];

	isAdmin(): boolean {
		const isAdmin: boolean = this.roles.includes('admin');
		return isAdmin;
	}
}

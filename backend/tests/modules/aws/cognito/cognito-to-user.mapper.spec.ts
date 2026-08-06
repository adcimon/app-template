import { CognitoToUser } from '../../../../src/modules/aws/cognito/mappers/cognito-to-user.mapper.js';
import { User } from '../../../../src/modules/users/types/user.js';

const attribute = (name: string, value: string) => ({ Name: name, Value: value });

describe('CognitoToUser', () => {
	it('should map Cognito attributes into a User', () => {
		const cognitoUser: any = {
			Username: 'usr_1',
			UserAttributes: [
				attribute('name', 'John'),
				attribute('family_name', 'Doe'),
				attribute('birthdate', '1990-01-01'),
				attribute('email', 'john@example.com'),
				attribute('email_verified', 'true'),
				attribute('phone_number', '+1234567890'),
				attribute('phone_number_verified', 'false'),
				attribute('locale', 'en-US'),
				attribute('zoneinfo', 'America/New_York'),
				attribute('picture', 'https://cdn.example.com/john.png'),
				attribute('roles', 'admin,editor'),
			],
		};

		const user: User = CognitoToUser.map(cognitoUser);

		expect(user).toBeInstanceOf(User);
		expect(user.id).toBe('usr_1');
		expect(user.name).toBe('John');
		expect(user.surname).toBe('Doe');
		expect(user.birthdate).toBe('1990-01-01');
		expect(user.email).toBe('john@example.com');
		expect(user.emailVerified).toBe(true);
		expect(user.phone).toBe('+1234567890');
		expect(user.phoneVerified).toBe(false);
		expect(user.locale).toBe('en-US');
		expect(user.timezone).toBe('America/New_York');
		expect(user.icon).toBe('https://cdn.example.com/john.png');
		expect(user.roles).toEqual(['admin', 'editor']);
	});

	it('should default missing attributes to empty values', () => {
		const cognitoUser: any = { Username: 'usr_2', UserAttributes: [] };

		const user: User = CognitoToUser.map(cognitoUser);

		expect(user.name).toBe('');
		expect(user.email).toBe('');
		expect(user.emailVerified).toBe(false);
		expect(user.roles).toEqual([]);
	});

	it('should read attributes from the Attributes field when UserAttributes is absent', () => {
		const cognitoUser: any = { Username: 'usr_3', Attributes: [attribute('email', 'jane@example.com')] };

		const user: User = CognitoToUser.map(cognitoUser);

		expect(user.email).toBe('jane@example.com');
	});

	it('should map an array of users', () => {
		const users: User[] = CognitoToUser.map([
			{ Username: 'usr_1', UserAttributes: [] } as any,
			{ Username: 'usr_2', UserAttributes: [] } as any,
		]);

		expect(users).toHaveLength(2);
		expect(users.map((user: User) => user.id)).toEqual(['usr_1', 'usr_2']);
	});
});

import { jest } from '@jest/globals';
import { UsersService } from '../../../src/modules/users/users.service.js';
import { User } from '../../../src/modules/users/types/user.js';

describe('UsersService', () => {
	let cognitoService: any;
	let usersService: UsersService;

	beforeEach(() => {
		cognitoService = {
			get: jest.fn(),
			getBy: jest.fn(),
			getBySub: jest.fn(),
			getByEmail: jest.fn(),
			getMyUser: jest.fn(),
			update: jest.fn(),
			updateEmail: jest.fn(),
			updatePhone: jest.fn(),
			updateIcon: jest.fn(),
		};
		usersService = new UsersService(cognitoService);
	});

	it('should delegate get() to CognitoService', async () => {
		const user: User = Object.assign(new User(), { id: 'usr_1' });
		cognitoService.get.mockResolvedValue(user);

		const result: User = await usersService.get('usr_1');

		expect(cognitoService.get).toHaveBeenCalledWith('usr_1');
		expect(result).toBe(user);
	});

	it('should delegate getBy() to CognitoService', async () => {
		cognitoService.getBy.mockResolvedValue([]);

		await usersService.getBy('email = "user@example.com"');

		expect(cognitoService.getBy).toHaveBeenCalledWith('email = "user@example.com"');
	});

	it('should delegate update() with the given params', async () => {
		const params = { name: 'John', surname: 'Doe' };
		cognitoService.update.mockResolvedValue(new User());

		await usersService.update('usr_1', params);

		expect(cognitoService.update).toHaveBeenCalledWith('usr_1', params);
	});

	it('should delegate updateEmail() to CognitoService', async () => {
		const params = { email: 'new@example.com' };
		cognitoService.updateEmail.mockResolvedValue(new User());

		await usersService.updateEmail('usr_1', params);

		expect(cognitoService.updateEmail).toHaveBeenCalledWith('usr_1', params);
	});

	it('should delegate updatePhone() to CognitoService', async () => {
		const params = { phone: '+1234567890' };
		cognitoService.updatePhone.mockResolvedValue(new User());

		await usersService.updatePhone('usr_1', params);

		expect(cognitoService.updatePhone).toHaveBeenCalledWith('usr_1', params);
	});

	it('should delegate updateIcon() to CognitoService', async () => {
		const params = { icon: 'https://cdn.example.com/icon.png' };
		cognitoService.updateIcon.mockResolvedValue(new User());

		await usersService.updateIcon('usr_1', params);

		expect(cognitoService.updateIcon).toHaveBeenCalledWith('usr_1', params);
	});
});

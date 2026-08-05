import { jest } from '@jest/globals';
import { AdminService } from '../../src/modules/admin/admin.service.js';
import { User } from '../../src/modules/users/types/user.js';

describe('AdminService', () => {
	let usersService: any;
	let adminService: AdminService;

	beforeEach(() => {
		usersService = { getBy: jest.fn() };
		adminService = new AdminService(usersService);
	});

	describe('getUsers', () => {
		it('should delegate to UsersService.getBy without a filter', async () => {
			const users: User[] = [Object.assign(new User(), { id: 'usr_1' })];
			usersService.getBy.mockResolvedValue(users);

			const result: User[] = await adminService.getUsers();

			expect(usersService.getBy).toHaveBeenCalledWith(undefined);
			expect(result).toBe(users);
		});

		it('should forward a filter to UsersService.getBy', async () => {
			usersService.getBy.mockResolvedValue([]);

			await adminService.getUsers('email = "user@example.com"');

			expect(usersService.getBy).toHaveBeenCalledWith('email = "user@example.com"');
		});
	});
});

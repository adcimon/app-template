import { RolesGuard } from '../../src/guards/roles.guard.js';
import { Role } from '../../src/types/role.js';

const createMockContext = (user?: any) => ({
	switchToHttp: () => ({
		getRequest: () => ({ user }),
	}),
});

describe('RolesGuard', () => {
	it('should return true when no roles specified', async () => {
		const Guard = RolesGuard();
		const guard = new Guard();

		const granted: boolean = await guard.canActivate(createMockContext({ roles: [] }) as any);

		expect(granted).toBe(true);
	});

	it('should return false when no user on request', async () => {
		const Guard = RolesGuard(Role.Admin);
		const guard = new Guard();

		const granted: boolean = await guard.canActivate(createMockContext() as any);

		expect(granted).toBe(false);
	});

	it('should return true when user has matching role', async () => {
		const Guard = RolesGuard(Role.Admin);
		const guard = new Guard();
		const user = { roles: [Role.Admin] };

		const granted: boolean = await guard.canActivate(createMockContext(user) as any);

		expect(granted).toBe(true);
	});

	it('should return false when user does not have matching role', async () => {
		const Guard = RolesGuard(Role.Admin);
		const guard = new Guard();
		const user = { roles: [] };

		const granted: boolean = await guard.canActivate(createMockContext(user) as any);

		expect(granted).toBe(false);
	});

	it('should return true when user has at least one matching role', async () => {
		const Guard = RolesGuard(Role.Admin);
		const guard = new Guard();
		const user = { roles: ['other', Role.Admin] };

		const granted: boolean = await guard.canActivate(createMockContext(user) as any);

		expect(granted).toBe(true);
	});
});

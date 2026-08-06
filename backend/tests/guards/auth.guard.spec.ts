import { jest } from '@jest/globals';
import { AuthGuard } from '../../src/guards/auth.guard.js';
import { UnauthorizedException } from '../../src/exceptions/unauthorized.exception.js';
import { AuthMethod } from '../../src/types/auth-method.js';

const createMockContext = (headers: Record<string, string>) => ({
	switchToHttp: () => ({
		getRequest: () => ({ headers }),
	}),
});

describe('AuthGuard', () => {
	let usersService: any;

	beforeEach(() => {
		usersService = { getMyUser: jest.fn() };
	});

	const build = (...methods: AuthMethod[]) => new (AuthGuard(...methods) as any)(usersService);

	it('should activate when no authorization header and None is allowed', async () => {
		const guard: any = build(AuthMethod.None);

		const activated: boolean = await guard.canActivate(createMockContext({}) as any);

		expect(activated).toBe(true);
	});

	it('should throw when no authorization header and None is not allowed', async () => {
		const guard: any = build(AuthMethod.Bearer);

		await expect(guard.canActivate(createMockContext({}) as any)).rejects.toBeInstanceOf(UnauthorizedException);
	});

	it('should throw when the authorization header has no token', async () => {
		const guard: any = build(AuthMethod.Bearer);

		await expect(guard.canActivate(createMockContext({ authorization: 'Bearer' }) as any)).rejects.toBeInstanceOf(
			UnauthorizedException,
		);
	});

	it('should attach the user and access token on a valid bearer token', async () => {
		const user = { id: 'usr_1' };
		usersService.getMyUser.mockResolvedValue(user);
		const guard: any = build(AuthMethod.Bearer);
		const request: any = { headers: { authorization: 'Bearer abc123' } };
		const context: any = { switchToHttp: () => ({ getRequest: () => request }) };

		const activated: boolean = await guard.canActivate(context);

		expect(activated).toBe(true);
		expect(request.accessToken).toBe('abc123');
		expect(request.user).toBe(user);
	});

	it('should throw UnauthorizedException when getMyUser rejects', async () => {
		usersService.getMyUser.mockRejectedValue(new Error('invalid token'));
		const guard: any = build(AuthMethod.Bearer);

		await expect(
			guard.canActivate(createMockContext({ authorization: 'Bearer abc123' }) as any),
		).rejects.toBeInstanceOf(UnauthorizedException);
	});

	it('should throw when the authorization scheme is not Bearer', async () => {
		const guard: any = build(AuthMethod.Bearer);

		await expect(
			guard.canActivate(createMockContext({ authorization: 'ApiKey abc123' }) as any),
		).rejects.toBeInstanceOf(UnauthorizedException);
	});
});

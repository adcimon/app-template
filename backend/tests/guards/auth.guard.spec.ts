import { jest } from '@jest/globals';
import { AuthGuard } from '../../src/guards/auth.guard.js';
import { UnauthorizedException } from '../../src/exceptions/unauthorized.exception.js';
import { AuthMethod } from '../../src/types/auth-method.js';

const createMockContext = (headers: Record<string, string>) => ({
	switchToHttp: () => ({
		getRequest: () => ({ headers }),
	}),
});

const build = (usersService: any) => {
	const Guard = AuthGuard(AuthMethod.Bearer);
	return new (Guard as any)(usersService);
};

describe('AuthGuard', () => {
	it('should activate when no authorization header and None is allowed', async () => {
		const Guard = AuthGuard(AuthMethod.None);
		const guard = new (Guard as any)({ getMyUser: jest.fn() });

		const activated: boolean = await guard.canActivate(createMockContext({}) as any);

		expect(activated).toBe(true);
	});

	it('should throw when no authorization header and None is not allowed', async () => {
		const guard = build({ getMyUser: jest.fn() });

		await expect(guard.canActivate(createMockContext({}) as any)).rejects.toBeInstanceOf(UnauthorizedException);
	});

	it('should throw when the authorization header has no token', async () => {
		const guard = build({ getMyUser: jest.fn() });

		await expect(guard.canActivate(createMockContext({ authorization: 'Bearer' }) as any)).rejects.toBeInstanceOf(
			UnauthorizedException,
		);
	});

	it('should attach the user and access token on a valid bearer token', async () => {
		const user = { id: 'usr_1' };
		const getMyUser = jest.fn<() => Promise<any>>().mockResolvedValue(user);
		const usersService = { getMyUser };
		const guard = build(usersService);
		const request: any = { headers: { authorization: 'Bearer abc123' } };
		const context: any = { switchToHttp: () => ({ getRequest: () => request }) };

		const activated: boolean = await guard.canActivate(context);

		expect(activated).toBe(true);
		expect(request.accessToken).toBe('abc123');
		expect(request.user).toBe(user);
	});

	it('should throw UnauthorizedException when getMyUser rejects', async () => {
		const getMyUser = jest.fn<() => Promise<any>>().mockRejectedValue(new Error('invalid token'));
		const usersService = { getMyUser };
		const guard = build(usersService);

		await expect(
			guard.canActivate(createMockContext({ authorization: 'Bearer abc123' }) as any),
		).rejects.toBeInstanceOf(UnauthorizedException);
	});

	it('should throw when the authorization scheme is not Bearer', async () => {
		const guard = build({ getMyUser: jest.fn() });

		await expect(
			guard.canActivate(createMockContext({ authorization: 'ApiKey abc123' }) as any),
		).rejects.toBeInstanceOf(UnauthorizedException);
	});
});

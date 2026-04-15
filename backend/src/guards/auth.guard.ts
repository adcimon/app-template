import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service.js';
import { UserDto } from '../modules/users/user.dto.js';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';
import { AuthMethod } from '../types/auth-method.js';

export const AuthGuard = (...methods: AuthMethod[]) => {
	@Injectable()
	class AuthGuardMixin implements CanActivate {
		constructor(readonly usersService: UsersService) {}

		async canActivate(context: ExecutionContext): Promise<boolean> {
			const request: any = context.switchToHttp().getRequest();
			const authHeader: string = request.headers.authorization;
			if (!authHeader) {
				throw new UnauthorizedException();
			}

			if (methods.includes(AuthMethod.Bearer) && authHeader.startsWith('Bearer ')) {
				// Extract the access token from the authorization header.
				const accessToken: string | undefined = authHeader.split(' ').at(1);
				if (!accessToken) {
					throw new UnauthorizedException();
				}

				// Verify the access token and get the user.
				try {
					const user: UserDto = await this.usersService.getMyUser(accessToken);
					request.accessToken = accessToken;
					request.user = user;
					return true;
				} catch (error: any) {
					throw new UnauthorizedException(error.message);
				}
			}

			throw new UnauthorizedException();
		}
	}

	const guard = mixin(AuthGuardMixin);

	return guard;
};

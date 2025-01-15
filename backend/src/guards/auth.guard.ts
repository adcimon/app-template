import { Injectable, CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { UserDto } from '../modules/users/user.dto';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { AuthMethod } from '../types/auth-method';

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

			if (methods.includes(AuthMethod.Bearer)) {
				if (authHeader.startsWith('Bearer ')) {
					// Extract the access token from the HTTP authorization header.
					const accessToken: string = authHeader.split(' ')[1];
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
						throw new UnauthorizedException(error?.message);
					}
				}
			}

			throw new UnauthorizedException();
		}
	}

	const guard = mixin(AuthGuardMixin);

	return guard;
};

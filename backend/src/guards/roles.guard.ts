import { Injectable, CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { UserDto } from '../modules/users/user.dto';
import { Role } from '../types/role';

export const RolesGuard = (...roles: Role[]) => {
	@Injectable()
	class RolesGuardMixin implements CanActivate {
		async canActivate(context: ExecutionContext): Promise<boolean> {
			if (!roles || roles.length === 0) {
				return true;
			}

			const request: any = context.switchToHttp().getRequest();
			if (!request.user) {
				return false;
			}

			const user: UserDto = request.user;
			const activate: boolean = roles.some((role: Role) => user.roles.includes(role));

			return activate;
		}
	}

	const guard = mixin(RolesGuardMixin);

	return guard;
};

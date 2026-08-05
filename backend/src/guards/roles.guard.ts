import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { User } from '../modules/users/types/user.js';
import { Role } from '../types/role.js';

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

			const user: User = request.user;
			const activate: boolean = roles.some((r: Role) => user.roles.includes(r));

			return activate;
		}
	}

	const guard = mixin(RolesGuardMixin);

	return guard;
};

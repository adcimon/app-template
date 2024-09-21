import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/user.dto';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly usersService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: any = context.switchToHttp().getRequest();
		const authHeader: string = request.headers.authorization;

		if (authHeader && authHeader.startsWith('Bearer ')) {
			const accessToken: string = authHeader.split(' ')[1];
			if (!accessToken) {
				throw new UnauthorizedException();
			}

			try {
				const user: UserDto = await this.usersService.getMyUser(accessToken);
				request.accessToken = accessToken;
				request.user = user;
				return true;
			} catch (error: any) {
				throw new UnauthorizedException(error?.message);
			}
		}

		return false;
	}
}

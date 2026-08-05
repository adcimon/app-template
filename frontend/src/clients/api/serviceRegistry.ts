import { AdminService } from './services/adminService';
import { AuthService } from './services/authService';
import { UsersService } from './services/usersService';

export const ServiceRegistry = {
	auth: AuthService,
	users: UsersService,
	admin: AdminService,
};

export type ServiceMap = {
	[K in keyof typeof ServiceRegistry]: InstanceType<(typeof ServiceRegistry)[K]>;
};

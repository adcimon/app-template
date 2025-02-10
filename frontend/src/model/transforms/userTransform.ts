import { User } from '../user';

export const UserTransform = (userDto: any): User => {
	const user: User = new User();

	user.id = userDto?.id ?? '';
	user.name = userDto?.name ?? '';
	user.surname = userDto?.surname ?? '';
	user.birthdate = userDto?.birthdate ?? '';
	user.email = userDto?.email ?? '';
	user.emailVerified = userDto?.emailVerified ?? false;
	user.phone = userDto?.phone ?? '';
	user.phoneVerified = userDto?.phoneVerified ?? false;
	user.country = userDto?.country ?? '';
	user.timezone = userDto?.timezone ?? '';
	user.avatar = userDto?.avatar ?? '';
	user.roles = userDto?.roles ?? [];

	return user;
};

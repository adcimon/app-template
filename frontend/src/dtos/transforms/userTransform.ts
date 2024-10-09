import { UserDto } from '../userDto';

export const UserTransform = (user: any): UserDto => {
	const dto: UserDto = new UserDto();

	dto.id = user?.id ?? '';
	dto.name = user?.name ?? '';
	dto.surname = user?.surname ?? '';
	dto.birthdate = user?.birthdate ?? '';
	dto.email = user?.email ?? '';
	dto.emailVerified = user?.emailVerified ?? false;
	dto.phone = user?.phone ?? '';
	dto.phoneVerified = user?.phoneVerified ?? false;
	dto.country = user?.country ?? '';
	dto.timezone = user?.timezone ?? '';
	dto.avatar = user?.avatar ?? '';
	dto.roles = user?.roles ?? [];

	return dto;
};

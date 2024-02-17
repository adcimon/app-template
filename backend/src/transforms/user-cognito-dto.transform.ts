import { UserDto } from '../dtos/user.dto';

export function UserCognitoToDto(user: any): UserDto {
	const dto: UserDto = new UserDto();

	const attributes: any = user['UserAttributes'] || user['Attributes'];
	const values: any = {};
	attributes.forEach((attribute: any) => {
		values[attribute.Name] = attribute.Value;
	});

	dto.id = user.Username;
	dto.name = values.name || '';
	dto.surname = values.family_name || '';
	dto.birthdate = values.birthdate || '';
	dto.email = values.email || '';
	dto.emailVerified = values.email_verified === 'true' ? true : false;
	dto.phone = values.phone_number || '';
	dto.phoneVerified = values.phone_number_verified === 'true' ? true : false;
	dto.country = values.locale || '';
	dto.timezone = values.zoneinfo || '';
	dto.avatar = values.picture || '';

	return dto;
}

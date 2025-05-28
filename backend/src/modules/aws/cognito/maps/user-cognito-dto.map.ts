import { UserDto } from '../../../users/user.dto';
import * as AWS from '@aws-sdk/client-cognito-identity-provider';

export function UserCognitoToDto(user: AWS.UserType | AWS.GetUserResponse | AWS.AdminGetUserResponse): UserDto {
	const dto: UserDto = new UserDto();

	const attributes: any = user['UserAttributes'] || user['Attributes'];
	const values: any = {};
	attributes.forEach((attribute: any) => {
		const name: string = attribute.Name.replace('custom:', '');
		const value: any = attribute.Value;
		values[name] = value;
	});

	dto.id = user.Username;
	dto.name = values.name ?? '';
	dto.surname = values.family_name ?? '';
	dto.birthdate = values.birthdate ?? '';
	dto.email = values.email ?? '';
	dto.emailVerified = values.email_verified === 'true' ? true : false;
	dto.phone = values.phone_number ?? '';
	dto.phoneVerified = values.phone_number_verified === 'true' ? true : false;
	dto.locale = values.locale ?? '';
	dto.timezone = values.zoneinfo ?? '';
	dto.avatar = values.picture ?? '';
	dto.roles = values.roles ? values.roles?.split(',') : [];

	return dto;
}

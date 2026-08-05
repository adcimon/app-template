import * as AWS from '@aws-sdk/client-cognito-identity-provider';
import { Mapper } from '../../../../mappers/mapper.js';
import { User } from '../../../users/types/user.js';

class CognitoToUserMapper extends Mapper<AWS.UserType | AWS.GetUserResponse | AWS.AdminGetUserResponse, User> {
	protected transform(user: AWS.UserType | AWS.GetUserResponse | AWS.AdminGetUserResponse): User {
		const obj: User = new User();

		const attributes: any = user['UserAttributes'] || user['Attributes'];
		const values: any = {};
		attributes.forEach((attribute: any) => {
			const name: string = attribute.Name.replace('custom:', '');
			const value: any = attribute.Value;
			values[name] = value;
		});

		obj.id = user.Username;
		obj.name = values.name ?? '';
		obj.surname = values.family_name ?? '';
		obj.birthdate = values.birthdate ?? '';
		obj.email = values.email ?? '';
		obj.emailVerified = values.email_verified === 'true' ? true : false;
		obj.phone = values.phone_number ?? '';
		obj.phoneVerified = values.phone_number_verified === 'true' ? true : false;
		obj.locale = values.locale ?? '';
		obj.timezone = values.zoneinfo ?? '';
		obj.icon = values.picture ?? '';
		obj.roles = values.roles ? values.roles?.split(',') : [];

		return obj;
	}
}

export const CognitoToUser = new CognitoToUserMapper();

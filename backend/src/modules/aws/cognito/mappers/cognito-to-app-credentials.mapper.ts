import { Mapper } from '../../../../mappers/mapper.js';
import { AppCredentials } from '../../../auth/types/app-credentials.js';

class CognitoToAppCredentialsMapper extends Mapper<any, AppCredentials> {
	protected transform(credentials: any): AppCredentials {
		const obj: AppCredentials = new AppCredentials();

		obj.identityToken = credentials?.identityToken ?? '';
		obj.accessToken = credentials?.accessToken ?? '';
		obj.refreshToken = credentials?.refreshToken ?? '';

		return obj;
	}
}

export const CognitoToAppCredentials = new CognitoToAppCredentialsMapper();

import { CognitoToAppCredentials } from '../../../../src/modules/aws/cognito/mappers/cognito-to-app-credentials.mapper.js';
import { AppCredentials } from '../../../../src/modules/auth/types/app-credentials.js';

describe('CognitoToAppCredentials', () => {
	it('should map raw tokens into AppCredentials', () => {
		const credentials: AppCredentials = CognitoToAppCredentials.map({
			idToken: 'id_1',
			accessToken: 'access_1',
			refreshToken: 'refresh_1',
		});

		expect(credentials).toBeInstanceOf(AppCredentials);
		expect(credentials.identityToken).toBe('id_1');
		expect(credentials.accessToken).toBe('access_1');
		expect(credentials.refreshToken).toBe('refresh_1');
	});

	it('should default missing fields to empty strings', () => {
		const credentials: AppCredentials = CognitoToAppCredentials.map({});

		expect(credentials.identityToken).toBe('');
		expect(credentials.accessToken).toBe('');
		expect(credentials.refreshToken).toBe('');
	});
});

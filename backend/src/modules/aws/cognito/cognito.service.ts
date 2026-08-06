import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../../config/config.service.js';
import { BooleanToStatus } from '../../../mappers/boolean-to-status.mapper.js';
import { CognitoToAppCredentials } from './mappers/cognito-to-app-credentials.mapper.js';
import { CognitoToUser } from './mappers/cognito-to-user.mapper.js';
import { Status } from '../../../types/status.js';
import { AppCredentials } from '../../auth/types/app-credentials.js';
import { User } from '../../users/types/user.js';
import {
	SignUpDwo,
	SignDownDwo,
	SignInDwo,
	RefreshTokenDwo,
	VerifyEmailDwo,
	ForgotPasswordDwo,
	ConfirmPasswordDwo,
	ChangePasswordDwo,
} from './auth.dwos.js';
import { UpdateUserDwo, UpdateEmailDwo, UpdatePhoneDwo, UpdateIconDwo } from './users.dwos.js';
import { NotFoundException } from '../../../exceptions/not-found.exception.js';
import { EmailTakenException } from '../../../exceptions/email-taken.exception.js';
import { CryptoUtils } from '../../../utils/crypto.utils.js';
import * as AWS from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService implements OnModuleInit {
	private client: AWS.CognitoIdentityProviderClient = null;

	constructor(
		// Base
		private readonly configService: ConfigService,
	) {}

	public async onModuleInit() {
		const region: string = await this.configService.getVariable('AWS_REGION');
		const accessKey: string = await this.configService.getVariable('AWS_ACCESS_KEY');
		const secretKey: string = await this.configService.getVariable('AWS_SECRET_KEY');
		this.client = new AWS.CognitoIdentityProviderClient({
			region: region,
			credentials: {
				accessKeyId: accessKey,
				secretAccessKey: secretKey,
			},
		});
	}

	private async authUser(id: string, password: string): Promise<object> {
		const clientId: string = await this.configService.getVariable('AWS_USER_POOL_API_CLIENT_ID');

		const input: AWS.InitiateAuthCommandInput = {
			AuthFlow: 'USER_PASSWORD_AUTH',
			ClientId: clientId,
			AuthParameters: {
				USERNAME: id,
				PASSWORD: password,
			},
		};

		const command: AWS.InitiateAuthCommand = new AWS.InitiateAuthCommand(input);

		const output: AWS.InitiateAuthCommandOutput = await this.client.send(command);
		const identityToken: string = output.AuthenticationResult?.IdToken ?? '';
		const accessToken: string = output.AuthenticationResult?.AccessToken ?? '';
		const refreshToken: string = output.AuthenticationResult?.RefreshToken ?? '';

		return {
			identityToken,
			accessToken,
			refreshToken,
		};
	}

	private async enableUser(id: string): Promise<Status> {
		const userPoolId: string = await this.configService.getVariable('AWS_USER_POOL_ID');

		const input: AWS.AdminEnableUserCommandInput = {
			UserPoolId: userPoolId,
			Username: id,
		};

		const command: AWS.AdminEnableUserCommand = new AWS.AdminEnableUserCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	private async disableUser(id: string): Promise<Status> {
		const userPoolId: string = await this.configService.getVariable('AWS_USER_POOL_ID');

		const input: AWS.AdminDisableUserCommandInput = {
			UserPoolId: userPoolId,
			Username: id,
		};

		const command: AWS.AdminDisableUserCommand = new AWS.AdminDisableUserCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	public async signUp(params: SignUpDwo): Promise<User> {
		let emailTaken: User = null;
		try {
			emailTaken = await this.getByEmail(params.email);
		} catch (error: any) {
			// Catch user not found exception.
		}
		if (emailTaken) {
			throw new EmailTakenException(params.email);
		}

		const clientId: string = await this.configService.getVariable('AWS_USER_POOL_API_CLIENT_ID');
		const username: string = CryptoUtils.generateId();
		const name: string = params.email.substring(0, params.email.indexOf('@'));

		const input: AWS.SignUpCommandInput = {
			ClientId: clientId,
			Username: username,
			Password: params.password,
			UserAttributes: [
				{
					Name: 'email',
					Value: params.email,
				},
				{
					Name: 'name',
					Value: name,
				},
				{
					Name: 'locale',
					Value: 'en-US',
				},
				{
					Name: 'zoneinfo',
					Value: 'UTC',
				},
			],
		};

		const command: AWS.SignUpCommand = new AWS.SignUpCommand(input);

		await this.client.send(command);

		const user: User = await this.getByEmail(params.email);

		return user;
	}

	public async signDown(accessToken: string, params: SignDownDwo): Promise<Status> {
		const user: User = await this.getMyUser(accessToken);

		await this.authUser(user.id, params.password);

		await this.deleteMyUser(accessToken);

		return BooleanToStatus.map(true);
	}

	public async signIn(params: SignInDwo): Promise<AppCredentials> {
		const user: User = await this.getByEmail(params.email);

		const tokens: object = await this.authUser(user.id, params.password);

		return CognitoToAppCredentials.map(tokens);
	}

	public async signOut(accessToken: string): Promise<Status> {
		const input: AWS.GlobalSignOutCommandInput = {
			AccessToken: accessToken,
		};

		const command: AWS.GlobalSignOutCommand = new AWS.GlobalSignOutCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	public async refreshToken(params: RefreshTokenDwo): Promise<AppCredentials> {
		const clientId: string = await this.configService.getVariable('AWS_USER_POOL_API_CLIENT_ID');

		const input: AWS.InitiateAuthCommandInput = {
			AuthFlow: 'REFRESH_TOKEN_AUTH',
			ClientId: clientId,
			AuthParameters: {
				REFRESH_TOKEN: params.refreshToken,
			},
		};

		const command: AWS.InitiateAuthCommand = new AWS.InitiateAuthCommand(input);

		const output: AWS.InitiateAuthCommandOutput = await this.client.send(command);
		const identityToken: string = output.AuthenticationResult?.IdToken ?? '';
		const accessToken: string = output.AuthenticationResult?.AccessToken ?? '';

		return CognitoToAppCredentials.map({
			identityToken,
			accessToken,
			refreshToken: params.refreshToken,
		});
	}

	public async verifyEmail(accessToken: string, params: VerifyEmailDwo): Promise<Status> {
		const input: AWS.VerifyUserAttributeCommandInput = {
			AccessToken: accessToken,
			AttributeName: 'email',
			Code: params.code,
		};

		const command: AWS.VerifyUserAttributeCommand = new AWS.VerifyUserAttributeCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	public async forgotPassword(params: ForgotPasswordDwo): Promise<Status> {
		const user: User = await this.getByEmail(params.email);

		const clientId: string = await this.configService.getVariable('AWS_USER_POOL_API_CLIENT_ID');

		const input: AWS.ForgotPasswordCommandInput = {
			ClientId: clientId,
			Username: user.id,
		};

		const command: AWS.ForgotPasswordCommand = new AWS.ForgotPasswordCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	public async confirmPassword(params: ConfirmPasswordDwo): Promise<Status> {
		const user: User = await this.getByEmail(params.email);

		const clientId: string = await this.configService.getVariable('AWS_USER_POOL_API_CLIENT_ID');

		const input: AWS.ConfirmForgotPasswordCommandInput = {
			ClientId: clientId,
			Username: user.id,
			ConfirmationCode: params.code,
			Password: params.password,
		};

		const command: AWS.ConfirmForgotPasswordCommand = new AWS.ConfirmForgotPasswordCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	public async changePassword(accessToken: string, params: ChangePasswordDwo): Promise<Status> {
		const input: AWS.ChangePasswordCommandInput = {
			AccessToken: accessToken,
			PreviousPassword: params.currentPassword,
			ProposedPassword: params.newPassword,
		};

		const command: AWS.ChangePasswordCommand = new AWS.ChangePasswordCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}

	public async get(id: string): Promise<User> {
		const userPoolId: string = await this.configService.getVariable('AWS_USER_POOL_ID');

		const input: AWS.AdminGetUserCommandInput = {
			UserPoolId: userPoolId,
			Username: id,
		};

		const command: AWS.AdminGetUserCommand = new AWS.AdminGetUserCommand(input);

		const output: AWS.AdminGetUserCommandOutput = await this.client.send(command);

		return CognitoToUser.map(output);
	}

	public async getBy(filter?: string): Promise<User[]> {
		const userPoolId: string = await this.configService.getVariable('AWS_USER_POOL_ID');

		const input: AWS.ListUsersCommandInput = {
			UserPoolId: userPoolId,
			Limit: 60, // Maximum number of users per API call.
			Filter: filter,
		};

		const users: AWS.UserType[] = [];
		while (true) {
			const command: AWS.ListUsersCommand = new AWS.ListUsersCommand(input);

			const output: AWS.ListUsersCommandOutput = await this.client.send(command);

			if (output.Users) {
				users.push(...output.Users);
			}

			if (output.PaginationToken) {
				input.PaginationToken = output.PaginationToken;
			} else {
				break;
			}
		}

		return CognitoToUser.map(users);
	}

	public async getBySub(sub: string): Promise<User> {
		const users: User[] = await this.getBy(`sub = "${sub}"`);
		if (users.length !== 1) {
			throw new NotFoundException(User, { sub });
		}

		const user: User = users[0];

		return user;
	}

	public async getByEmail(email: string): Promise<User> {
		const users: User[] = await this.getBy(`email = "${email}"`);
		if (users.length !== 1) {
			throw new NotFoundException(User, { email });
		}

		const user: User = users[0];

		return user;
	}

	public async getMyUser(accessToken: string): Promise<User> {
		const input: AWS.GetUserCommandInput = {
			AccessToken: accessToken,
		};

		const command: AWS.GetUserCommand = new AWS.GetUserCommand(input);

		const user: AWS.GetUserCommandOutput = await this.client.send(command);

		return CognitoToUser.map(user);
	}

	public async update(id: string, params: UpdateUserDwo): Promise<User> {
		const userPoolId: string = await this.configService.getVariable('AWS_USER_POOL_ID');

		const attributes = [];
		if (params.name !== undefined && params.name !== null) {
			attributes.push({ Name: 'name', Value: params.name });
		}
		if (params.surname !== undefined && params.surname !== null) {
			attributes.push({ Name: 'family_name', Value: params.surname });
		}
		if (params.birthdate !== undefined && params.birthdate !== null) {
			attributes.push({ Name: 'birthdate', Value: params.birthdate });
		}
		if (params.locale !== undefined && params.locale !== null) {
			attributes.push({ Name: 'locale', Value: params.locale });
		}
		if (params.timezone !== undefined && params.timezone !== null) {
			attributes.push({ Name: 'zoneinfo', Value: params.timezone });
		}

		const input: AWS.AdminUpdateUserAttributesCommandInput = {
			UserPoolId: userPoolId,
			Username: id,
			UserAttributes: attributes,
		};

		const command: AWS.AdminUpdateUserAttributesCommand = new AWS.AdminUpdateUserAttributesCommand(input);

		await this.client.send(command);

		return await this.get(id);
	}

	private async updateAttribute(id: string, name: string, value: any): Promise<User> {
		const userPoolId: string = await this.configService.getVariable('AWS_USER_POOL_ID');
		const attributes = [{ Name: name, Value: value }];

		const input: AWS.AdminUpdateUserAttributesCommandInput = {
			UserPoolId: userPoolId,
			Username: id,
			UserAttributes: attributes,
		};

		const command: AWS.AdminUpdateUserAttributesCommand = new AWS.AdminUpdateUserAttributesCommand(input);

		await this.client.send(command);

		return await this.get(id);
	}

	public async updateEmail(id: string, params: UpdateEmailDwo): Promise<User> {
		const users: any[] = await this.getBy(`email = "${params.email}"`);
		if (users.length !== 0) {
			throw new EmailTakenException(params.email);
		}

		return await this.updateAttribute(id, 'email', params.email);
	}

	public async updatePhone(id: string, params: UpdatePhoneDwo): Promise<User> {
		return await this.updateAttribute(id, 'phone_number', params.phone);
	}

	public async updateIcon(id: string, params: UpdateIconDwo): Promise<User> {
		return await this.updateAttribute(id, 'picture', params.icon);
	}

	public async deleteMyUser(accessToken: string): Promise<Status> {
		const input: AWS.DeleteUserCommandInput = {
			AccessToken: accessToken,
		};

		const command: AWS.DeleteUserCommand = new AWS.DeleteUserCommand(input);

		await this.client.send(command);

		return BooleanToStatus.map(true);
	}
}

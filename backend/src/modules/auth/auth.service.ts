import { Injectable } from '@nestjs/common';
import { EventBrokerService } from '../event-broker/event-broker.service.js';
import { CognitoService } from '../aws/cognito/cognito.service.js';
import { Status } from '../../types/status.js';
import { AppCredentials } from './types/app-credentials.js';
import { User } from '../users/types/user.js';
import {
	SignUpDto,
	SignDownDto,
	SignInDto,
	RefreshTokenDto,
	VerifyEmailDto,
	ForgotPasswordDto,
	ConfirmPasswordDto,
	ChangePasswordDto,
} from './auth.dtos.js';
import { UserDeletedEvent } from '../../events/user-deleted.event.js';

@Injectable()
export class AuthService {
	constructor(
		// Base
		private readonly eventBrokerService: EventBrokerService,
		// AWS
		private readonly cognitoService: CognitoService,
	) {}

	public async signUp(params: SignUpDto): Promise<User> {
		const user: User = await this.cognitoService.signUp(params);
		return user;
	}

	public async signDown(accessToken: string, params: SignDownDto): Promise<Status> {
		const user: User = await this.cognitoService.getMyUser(accessToken);

		const status: Status = await this.cognitoService.signDown(accessToken, params);
		if (status.status) {
			this.eventBrokerService.emit(UserDeletedEvent.name, new UserDeletedEvent(user));
		}

		return status;
	}

	public async signIn(params: SignInDto): Promise<AppCredentials> {
		const credentials: AppCredentials = await this.cognitoService.signIn(params);
		return credentials;
	}

	public async signOut(accessToken: string): Promise<Status> {
		const status: Status = await this.cognitoService.signOut(accessToken);
		return status;
	}

	public async refreshToken(params: RefreshTokenDto): Promise<AppCredentials> {
		const credentials: AppCredentials = await this.cognitoService.refreshToken(params);
		return credentials;
	}

	public async verifyEmail(accessToken: string, params: VerifyEmailDto): Promise<Status> {
		const status: Status = await this.cognitoService.verifyEmail(accessToken, params);
		return status;
	}

	public async forgotPassword(params: ForgotPasswordDto): Promise<Status> {
		const status: Status = await this.cognitoService.forgotPassword(params);
		return status;
	}

	public async confirmPassword(params: ConfirmPasswordDto): Promise<Status> {
		const status: Status = await this.cognitoService.confirmPassword(params);
		return status;
	}

	public async changePassword(accessToken: string, params: ChangePasswordDto): Promise<Status> {
		const status: Status = await this.cognitoService.changePassword(accessToken, params);
		return status;
	}
}

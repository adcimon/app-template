import { Injectable } from '@nestjs/common';
import { EventBrokerService } from '../event-broker/event-broker.service.js';
import { CognitoService } from '../aws/cognito/cognito.service.js';
import { Status } from '../../types/status.js';
import { AppCredentials } from './types/app-credentials.js';
import { User } from '../users/types/user.js';
import { UserDeletedEvent } from '../../events/user-deleted.event.js';

@Injectable()
export class AuthService {
	constructor(
		// Base
		private readonly eventBrokerService: EventBrokerService,
		// AWS
		private readonly cognitoService: CognitoService,
	) {}

	public async signUp(email: string, password: string): Promise<User> {
		const user: User = await this.cognitoService.signUp(email, password);
		return user;
	}

	public async signDown(accessToken: string, password: string): Promise<Status> {
		const user: User = await this.cognitoService.getMyUser(accessToken);

		const status: Status = await this.cognitoService.signDown(accessToken, password);
		if (status.status) {
			this.eventBrokerService.emit(UserDeletedEvent.name, new UserDeletedEvent(user));
		}

		return status;
	}

	public async signIn(email: string, password: string): Promise<AppCredentials> {
		const credentials: AppCredentials = await this.cognitoService.signIn(email, password);
		return credentials;
	}

	public async signOut(accessToken: string): Promise<Status> {
		const status: Status = await this.cognitoService.signOut(accessToken);
		return status;
	}

	public async refreshToken(refreshToken: string): Promise<AppCredentials> {
		const credentials: AppCredentials = await this.cognitoService.refreshToken(refreshToken);
		return credentials;
	}

	public async verifyEmail(accessToken: string, code: string): Promise<Status> {
		const status: Status = await this.cognitoService.verifyEmail(accessToken, code);
		return status;
	}

	public async forgotPassword(email: string): Promise<Status> {
		const status: Status = await this.cognitoService.forgotPassword(email);
		return status;
	}

	public async confirmPassword(email: string, code: string, password: string): Promise<Status> {
		const status: Status = await this.cognitoService.confirmPassword(email, code, password);
		return status;
	}

	public async changePassword(accessToken: string, currentPassword: string, newPassword: string): Promise<Status> {
		const status: Status = await this.cognitoService.changePassword(accessToken, currentPassword, newPassword);
		return status;
	}
}

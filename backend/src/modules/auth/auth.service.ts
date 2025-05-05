import { Injectable } from '@nestjs/common';
import { CognitoService } from '../aws/cognito/cognito.service';
import { StatusDto } from '../../dtos/status.dto';
import { CredentialsDto } from './credentials.dto';
import { UserDto } from '../users/user.dto';

@Injectable()
export class AuthService {
	constructor(
		// AWS
		private readonly cognitoService: CognitoService,
	) {}

	public async signUp(email: string, password: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.signUp(email, password);
		return user;
	}

	public async signDown(accessToken: string, password: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.signDown(accessToken, password);
		return status;
	}

	public async signIn(email: string, password: string): Promise<CredentialsDto> {
		const credentials: CredentialsDto = await this.cognitoService.signIn(email, password);
		return credentials;
	}

	public async signOut(accessToken: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.signOut(accessToken);
		return status;
	}

	public async refreshToken(refreshToken: string): Promise<CredentialsDto> {
		const credentials: CredentialsDto = await this.cognitoService.refreshToken(refreshToken);
		return credentials;
	}

	public async verifyEmail(accessToken: string, code: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.verifyEmail(accessToken, code);
		return status;
	}

	public async forgotPassword(email: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.forgotPassword(email);
		return status;
	}

	public async confirmPassword(email: string, code: string, password: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.confirmPassword(email, code, password);
		return status;
	}

	public async changePassword(accessToken: string, currentPassword: string, newPassword: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.changePassword(accessToken, currentPassword, newPassword);
		return status;
	}
}

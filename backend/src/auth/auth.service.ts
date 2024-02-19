import { Injectable } from '@nestjs/common';
import { CognitoService } from '../cognito/cognito.service';
import { StatusDto } from '../dtos/status.dto';
import { CredentialsDto } from './credentials.dto';
import { UserDto } from '../users/user.dto';

@Injectable()
export class AuthService {
	constructor(private readonly cognitoService: CognitoService) {}

	public async signUp(email: string, password: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.signUp(email, password);
		return user;
	}

	public async signDown(accessToken: string, password: string): Promise<UserDto> {
		const user: UserDto = await this.cognitoService.signDown(accessToken, password);
		return user;
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

	public async forgotPassword(email: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.forgotPassword(email);
		return status;
	}

	public async changePassword(email: string, code: string, password: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.changePassword(email, code, password);
		return status;
	}

	public async verifyEmail(accessToken: string, code: string): Promise<StatusDto> {
		const status: StatusDto = await this.cognitoService.verifyEmail(accessToken, code);
		return status;
	}
}

import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { CognitoService } from '../cognito/cognito.service';
import { Transform } from '../decorators/transform.decorator';
import { StatusBooleanToDto } from '../transforms/status-boolean-dto.transform';
import { CredentialsObjectToDto } from '../transforms/credentials-object-dto.transform';
import { UserCognitoToDto } from '../transforms/user-cognito-dto.transform';
import { StatusDto } from '../dtos/status.dto';
import { CredentialsDto } from '../dtos/credentials.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class AuthService implements IAuthService {
	constructor(private readonly cognitoService: CognitoService) {}

	@Transform(UserCognitoToDto)
	public async signUp(email: string, password: string): Promise<UserDto> {
		return await this.cognitoService.signUp(email, password);
	}

	@Transform(UserCognitoToDto)
	public async signDown(accessToken: string, password: string): Promise<UserDto> {
		return (await this.cognitoService.signDown(accessToken, password)) as any;
	}

	@Transform(CredentialsObjectToDto)
	public async signIn(email: string, password: string): Promise<CredentialsDto> {
		return (await this.cognitoService.signIn(email, password)) as any;
	}

	@Transform(StatusBooleanToDto)
	public async signOut(accessToken: string): Promise<StatusDto> {
		return (await this.cognitoService.signOut(accessToken)) as any;
	}

	@Transform(CredentialsObjectToDto)
	public async refreshToken(refreshToken: string): Promise<CredentialsDto> {
		const accessToken: string = await this.cognitoService.refreshToken(refreshToken);
		return { accessToken, refreshToken };
	}

	@Transform(StatusBooleanToDto)
	public async forgotPassword(email: string): Promise<StatusDto> {
		return (await this.cognitoService.forgotPassword(email)) as any;
	}

	@Transform(StatusBooleanToDto)
	public async changePassword(email: string, code: string, password: string): Promise<StatusDto> {
		return (await this.cognitoService.changePassword(email, code, password)) as any;
	}

	@Transform(StatusBooleanToDto)
	public async verifyEmail(accessToken: string, code: string): Promise<StatusDto> {
		return (await this.cognitoService.verifyEmail(accessToken, code)) as any;
	}
}

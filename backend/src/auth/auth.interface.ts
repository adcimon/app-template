import { StatusDto } from '../dtos/status.dto';
import { CredentialsDto } from '../dtos/credentials.dto';
import { UserDto } from '../dtos/user.dto';

export interface IAuthService {
	signUp(email: string, password: string): Promise<UserDto>;
	signDown(accessToken: string, password: string): Promise<UserDto>;
	signIn(email: string, password: string): Promise<CredentialsDto>;
	signOut(accessToken: string): Promise<StatusDto>;
	refreshToken(refreshToken: string): Promise<CredentialsDto>;
	forgotPassword(email: string): Promise<StatusDto>;
	changePassword(email: string, code: string, password: string): Promise<StatusDto>;
	verifyEmail(accessToken: string, code: string): Promise<StatusDto>;
}

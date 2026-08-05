import { ApiService } from '../apiService';
import {
	AppCredentials,
	ChangePasswordDto,
	ConfirmPasswordDto,
	ForgotPasswordDto,
	RefreshTokenDto,
	SignDownDto,
	SignInDto,
	SignUpDto,
	Status,
	User,
	VerifyEmailDto,
} from '../../../api/api';

export class AuthService extends ApiService {
	public signUp = async (body: SignUpDto): Promise<User> => {
		return this.api.post<User>({
			endpointId: 'Auth/signUp',
			body: body,
		});
	};

	public signDown = async (body: SignDownDto): Promise<Status> => {
		return this.api.post<Status>({
			endpointId: 'Auth/signDown',
			body: body,
			useAuthorization: true,
		});
	};

	public signIn = async (body: SignInDto): Promise<AppCredentials> => {
		return this.api.post<AppCredentials>({
			endpointId: 'Auth/signIn',
			body: body,
		});
	};

	public signOut = async (): Promise<Status> => {
		return this.api.post<Status>({
			endpointId: 'Auth/signOut',
			body: {},
			useAuthorization: true,
		});
	};

	public refreshToken = async (body: RefreshTokenDto): Promise<AppCredentials> => {
		return this.api.post<AppCredentials>({
			endpointId: 'Auth/refreshToken',
			body: body,
		});
	};

	public verifyEmail = async (body: VerifyEmailDto): Promise<Status> => {
		return this.api.post<Status>({
			endpointId: 'Auth/verifyEmail',
			body: body,
			useAuthorization: true,
		});
	};

	public forgotPassword = async (body: ForgotPasswordDto): Promise<Status> => {
		return this.api.post<Status>({
			endpointId: 'Auth/forgotPassword',
			body: body,
		});
	};

	public confirmPassword = async (body: ConfirmPasswordDto): Promise<Status> => {
		return this.api.post<Status>({
			endpointId: 'Auth/confirmPassword',
			body: body,
		});
	};

	public changePassword = async (body: ChangePasswordDto): Promise<Status> => {
		return this.api.post<Status>({
			endpointId: 'Auth/changePassword',
			body: body,
			useAuthorization: true,
		});
	};
}

export interface IBackendClient {
	cancelRequests(): void;
	signUp(email: string, password: string): Promise<any>;
	signDown(password: string): Promise<any>;
	signIn(email: string, password: string): Promise<any>;
	signOut(): Promise<any>;
	refreshToken(): Promise<any>;
	forgotPassword(email: string): Promise<any>;
	changePassword(email: string, code: string, password: string): Promise<any>;
	verifyEmail(code: string): Promise<any>;
	getUsers(): Promise<any>;
	getMyUser(): Promise<any>;
	updateMyUser(name: string, surname: string, birthdate: string, country: string, timezone: string): Promise<any>;
	updateMyEmail(email: string): Promise<any>;
	updateMyPhone(phone: string): Promise<any>;
	updateMyPassword(currentPassword: string, newPassword: string): Promise<any>;
	updateMyAvatar(avatar: string): Promise<any>;
}

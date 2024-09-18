import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from './httpMethods';
import { AuthService } from './services/authService';
import { UsersService } from './services/usersService';

export class ApiClient {
	authService: AuthService;
	usersService: UsersService;
	cancelRequests: () => void;

	constructor(
		httpGet: HttpGet,
		httpPost: HttpPost,
		httpPatch: HttpPatch,
		httpPut: HttpPut,
		httpDelete: HttpDelete,
		cancelRequests: () => void,
	) {
		this.authService = new AuthService(httpGet, httpPost, httpPatch, httpPut, httpDelete);
		this.usersService = new UsersService(httpGet, httpPost, httpPatch, httpPut, httpDelete);
		this.cancelRequests = cancelRequests;
	}
}

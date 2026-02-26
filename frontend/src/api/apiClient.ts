import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from './httpMethods';
import { AuthService } from './services/authService';
import { UsersService } from './services/usersService';
import { AdminService } from './services/adminService';

export class ApiClient {
	authService: AuthService;
	usersService: UsersService;
	adminService: AdminService;
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
		this.adminService = new AdminService(httpGet, httpPost, httpPatch, httpPut, httpDelete);
		this.cancelRequests = cancelRequests;
	}
}

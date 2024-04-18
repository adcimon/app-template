import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from './httpMethods';
import { IAuthService, newAuthService } from './services/authService';
import { IUsersService, newUsersService } from './services/usersService';

export interface IApiClient {
	authService: IAuthService;
	usersService: IUsersService;
	cancelRequests: () => void;
}

export const newApiClient = (
	httpGet: HttpGet,
	httpPost: HttpPost,
	httpPatch: HttpPatch,
	httpPut: HttpPut,
	httpDelete: HttpDelete,
	cancelRequests: () => void,
): IApiClient => {
	return {
		authService: newAuthService(httpGet, httpPost, httpPatch, httpPut, httpDelete),
		usersService: newUsersService(httpGet, httpPost, httpPatch, httpPut, httpDelete),
		cancelRequests: cancelRequests,
	};
};

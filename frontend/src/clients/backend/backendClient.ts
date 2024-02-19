import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from './httpMethods';
import { IAuthClient, newAuthClient } from './clients/authClient';
import { IUsersClient, newUsersClient } from './clients/usersClient';

export interface IBackendClient {
	authClient: IAuthClient;
	usersClient: IUsersClient;
	cancelRequests: () => void;
}

export const newBackendClient = (
	httpGet: HttpGet,
	httpPost: HttpPost,
	httpPatch: HttpPatch,
	httpPut: HttpPut,
	httpDelete: HttpDelete,
	cancelRequests: () => void,
): IBackendClient => {
	return {
		authClient: newAuthClient(httpGet, httpPost, httpPatch, httpPut, httpDelete),
		usersClient: newUsersClient(httpGet, httpPost, httpPatch, httpPut, httpDelete),
		cancelRequests: cancelRequests,
	};
};

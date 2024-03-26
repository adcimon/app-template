import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from './httpMethods';
import { IAuthClient, newAuthClient } from './clients/authClient';
import { IUsersClient, newUsersClient } from './clients/usersClient';

export interface IApiClient {
	authClient: IAuthClient;
	usersClient: IUsersClient;
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
		authClient: newAuthClient(httpGet, httpPost, httpPatch, httpPut, httpDelete),
		usersClient: newUsersClient(httpGet, httpPost, httpPatch, httpPut, httpDelete),
		cancelRequests: cancelRequests,
	};
};

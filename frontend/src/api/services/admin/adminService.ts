import { HttpDelete, HttpGet, HttpPatch, HttpPost, HttpPut } from '../../httpMethods';

export class AdminService {
	httpGet: HttpGet;
	httpPost: HttpPost;
	httpPatch: HttpPatch;
	httpPut: HttpPut;
	httpDelete: HttpDelete;

	constructor(httpGet: HttpGet, httpPost: HttpPost, httpPatch: HttpPatch, httpPut: HttpPut, httpDelete: HttpDelete) {
		this.httpGet = httpGet;
		this.httpPost = httpPost;
		this.httpPatch = httpPatch;
		this.httpPut = httpPut;
		this.httpDelete = httpDelete;
	}

	getUsers = async (): Promise<any> => {
		return this.httpGet({
			endpoint: '/users',
			useAuthorization: true,
		});
	};
}

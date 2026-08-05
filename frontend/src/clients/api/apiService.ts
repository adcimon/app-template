import { ApiClient } from './apiClient';

export abstract class ApiService {
	constructor(protected api: ApiClient) {}
}

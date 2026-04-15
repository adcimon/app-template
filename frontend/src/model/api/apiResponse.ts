import { ApiError } from './apiError.js';

export class ApiResponse {
	version: string = '';
	endpoint: string = '';
	timestamp: string = '';
	data?: any;
	error?: ApiError;
}

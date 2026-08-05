import { ApiConfig } from '../apiClient';
import { ApiError, ErrorCode } from '../../../api/api';
import { ConsoleUtils } from '../../../utils/consoleUtils';

export class RequestInterceptor {
	constructor(private config: ApiConfig) {}

	onFulfilled = (config: any) => {
		const endpoint: string = `${config?.baseURL}${config?.url}`;
		const method: string = config?.method?.toUpperCase();
		const data: any = config?.data || {};

		ConsoleUtils.logRequest(method, endpoint, data);

		return config;
	};

	onRejected = (error: any) => {
		const apiError: ApiError = {
			code: ErrorCode.GenericError,
			status: 418,
			message: error.message,
			detail: error,
		};

		return Promise.reject(apiError);
	};
}

import { ApiError } from '../../../model/api/apiError';
import { ConsoleUtils } from '../../../utils/consoleUtils';

export class RequestInterceptor {
	static onFulfilled = (config: any) => {
		const endpoint: string = `${config?.baseURL}${config?.url}`;
		const method: string = config?.method?.toUpperCase();
		const data: any = config?.data || {};

		ConsoleUtils.logRequest(method, endpoint, data);

		return config;
	};

	static onRejected = (error: any) => {
		const apiError: ApiError = {
			code: 'api_error',
			message: error.message,
			data: error,
		};

		return Promise.reject(apiError);
	};
}

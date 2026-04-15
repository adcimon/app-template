import { ApiResponse } from '../../../model/api/apiResponse';
import { ApiError } from '../../../model/api/apiError';
import { ConsoleUtils } from '../../../utils/consoleUtils';

export class ResponseInterceptor {
	static onFulfilled = (response: any) => {
		const status: number = response?.status;

		const apiResponse: ApiResponse = response?.data;
		if (!apiResponse || !apiResponse.data) {
			const apiError: ApiError = {
				code: 'api_error',
				message: 'Invalid response',
				data: apiResponse,
			};

			return Promise.reject(apiError);
		}

		ConsoleUtils.logResponse(status, apiResponse.endpoint, apiResponse);

		return Promise.resolve(apiResponse.data);
	};

	static onRejected = (error: any) => {
		const status: number = error?.response?.status ?? 666;

		const apiResponse: ApiResponse = error?.response?.data;
		if (!apiResponse || !apiResponse.error) {
			const endpoint: string = error.config.baseURL + error.config.url;

			ConsoleUtils.logResponse(status, endpoint, error);

			const apiError: ApiError = {
				code: 'api_error',
				message: error.message,
				data: error,
			};

			return Promise.reject(apiError);
		}

		ConsoleUtils.logResponse(status, apiResponse.endpoint, apiResponse);

		return Promise.reject(apiResponse.error);
	};
}

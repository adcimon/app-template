import { ApiConfig } from '../apiClient';
import { ApiError, ApiResponse, ErrorCode, version } from '../../../api/api';
import { ConsoleUtils } from '../../../utils/consoleUtils';

export class ResponseInterceptor {
	constructor(private config: ApiConfig) {}

	private checkVersion = (response: ApiResponse): void => {
		if (response.version && response.version !== version) {
			this.config.onVersionMismatch(version, response.version);
		}
	};

	onFulfilled = (response: any): any => {
		const status: number = response?.status;

		const apiResponse: ApiResponse = response?.data;
		if (!apiResponse || !apiResponse.data) {
			const apiError: ApiError = {
				code: ErrorCode.GenericError,
				status: 418,
				message: 'Invalid response',
				detail: apiResponse,
			};

			return Promise.reject(apiError);
		}

		this.checkVersion(apiResponse);

		ConsoleUtils.logResponse(status, apiResponse.endpoint, apiResponse);

		return Promise.resolve(apiResponse.data);
	};

	onRejected = (error: any) => {
		const status: number = error?.response?.status ?? 666;

		const apiResponse: ApiResponse = error?.response?.data;
		if (!apiResponse || !apiResponse.error) {
			const endpoint: string = error.config.baseURL + error.config.url;

			ConsoleUtils.logResponse(status, endpoint, error);

			const apiError: ApiError = {
				code: ErrorCode.GenericError,
				status: 418,
				message: error.message,
				detail: error,
			};

			return Promise.reject(apiError);
		}

		this.checkVersion(apiResponse);

		ConsoleUtils.logResponse(status, apiResponse.endpoint, apiResponse);

		return Promise.reject(apiResponse.error);
	};
}

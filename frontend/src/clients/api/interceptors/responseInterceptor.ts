import { ApiError } from '../../../model/api/apiError';
import { ConsoleUtils } from '../../../utils/consoleUtils';

export class ResponseInterceptor {
	static onFulfilled = (response: any) => {
		const status: number = response?.status;
		const body: any = response?.data;
		const endpoint: string = body?.endpoint;
		const data: any = body?.data;

		ConsoleUtils.logResponse(status, endpoint, body);

		return Promise.resolve(data);
	};

	static onRejected = (error: any) => {
		const status: number = error?.response?.status ?? 666;

		const body: any = error?.response?.data;
		const endpoint: string = body?.endpoint;
		const err: any = body?.error;

		if (body && err) {
			ConsoleUtils.logResponse(status, endpoint, body);
			return Promise.reject(err);
		} else {
			const endpoint: string = error.config.baseURL + error.config.url;

			ConsoleUtils.logResponse(status, endpoint, error);

			const apiError: ApiError = new ApiError();
			apiError.code = 'network_error';
			apiError.message = error.message;
			apiError.data = error;

			return Promise.reject(apiError);
		}
	};
}

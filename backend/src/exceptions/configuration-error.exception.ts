import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class ConfigurationErrorException extends HttpException {
	constructor(message?: string) {
		const error: ApiError = new ApiError(
			ErrorCode.ConfigurationError,
			HttpStatus.INTERNAL_SERVER_ERROR,
			message || 'Configuration error',
		);

		super(error, error.status);
	}
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class GenericErrorException extends HttpException {
	constructor(status?: number, message?: string) {
		const error: ApiError = new ApiError(
			ErrorCode.GenericError,
			status || HttpStatus.INTERNAL_SERVER_ERROR,
			message || 'Generic error',
		);

		super(error, error.status);
	}
}

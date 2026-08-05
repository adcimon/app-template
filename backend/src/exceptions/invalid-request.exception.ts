import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class InvalidRequestException extends HttpException {
	constructor(message?: string) {
		const error: ApiError = new ApiError(
			ErrorCode.InvalidRequest,
			HttpStatus.BAD_REQUEST,
			message || 'Invalid request',
		);

		super(error, error.status);
	}
}

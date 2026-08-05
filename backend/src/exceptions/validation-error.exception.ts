import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class ValidationErrorException extends HttpException {
	constructor(message?: string) {
		const error: ApiError = new ApiError(
			ErrorCode.ValidationError,
			HttpStatus.BAD_REQUEST,
			message || 'Validation error',
		);

		super(error, error.status);
	}
}

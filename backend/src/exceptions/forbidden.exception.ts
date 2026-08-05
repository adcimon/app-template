import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class ForbiddenException extends HttpException {
	constructor(message?: string) {
		const error: ApiError = new ApiError(ErrorCode.Forbidden, HttpStatus.FORBIDDEN, message || 'Forbidden');

		super(error, error.status);
	}
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class UnauthorizedException extends HttpException {
	constructor(message?: string) {
		const error: ApiError = new ApiError(ErrorCode.Unauthorized, HttpStatus.UNAUTHORIZED, message || 'Unauthorized');

		super(error, error.status);
	}
}

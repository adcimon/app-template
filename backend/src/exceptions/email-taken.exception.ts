import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';

export class EmailTakenException extends HttpException {
	constructor(email?: string) {
		const error: ApiError = new ApiError(ErrorCode.EmailTaken, HttpStatus.CONFLICT, 'Email is already being used', {
			email,
		});

		super(error, error.status);
	}
}

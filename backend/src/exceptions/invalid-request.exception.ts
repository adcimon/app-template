import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class InvalidRequestException extends HttpException {
	constructor(message?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'invalid_request';
		error.message = message || 'Invalid request';
		super(error, HttpStatus.BAD_REQUEST);
	}
}

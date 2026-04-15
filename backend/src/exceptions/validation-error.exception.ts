import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class ValidationErrorException extends HttpException {
	constructor(message?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'validation_error';
		error.message = message || 'Validation error';
		super(error, HttpStatus.BAD_REQUEST);
	}
}

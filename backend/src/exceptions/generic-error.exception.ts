import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class GenericErrorException extends HttpException {
	constructor(status?: number, message?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'generic_error';
		error.message = message || 'Generic error';
		super(error, status || HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

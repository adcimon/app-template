import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class ForbiddenException extends HttpException {
	constructor(message?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'forbidden';
		error.message = message || 'Forbidden';
		super(error, HttpStatus.FORBIDDEN);
	}
}

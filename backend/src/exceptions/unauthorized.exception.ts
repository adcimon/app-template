import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class UnauthorizedException extends HttpException {
	constructor(message?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'unauthorized';
		error.message = message || 'Unauthorized';
		super(error, HttpStatus.UNAUTHORIZED);
	}
}

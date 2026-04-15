import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class EmailTakenException extends HttpException {
	constructor(email?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'email_taken';
		error.message = 'Email is already being used';
		error.data = { email: email };
		super(error, HttpStatus.CONFLICT);
	}
}

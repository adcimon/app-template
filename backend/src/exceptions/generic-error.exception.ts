import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorDto } from '../dtos/error.dto';

export class GenericErrorException extends HttpException {
	constructor(status?: number, message?: string) {
		const error: ErrorDto = new ErrorDto();
		error.code = 'generic_error';
		error.message = message || 'Generic error';
		super(error, status || HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';

export class ConfigurationErrorException extends HttpException {
	constructor(message?: string) {
		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'configuration_error';
		error.message = message || 'Configuration error';
		super(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorDto } from '../dtos/error.dto';

export class ResourceNotFoundException extends HttpException {
	constructor(type: string, args?: any) {
		const error: ErrorDto = new ErrorDto();
		error.code = 'resource_not_found';
		error.message = args?.message || (type ? `${type} not found` : 'Resource not found');
		error.data = { type: type, ...args };
		super(error, HttpStatus.NOT_FOUND);
	}
}

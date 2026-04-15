import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDto } from '../dtos/api-error.dto.js';
import { ExceptionUtils } from '../utils/exception.utils.js';

export class ResourceNotFoundException extends HttpException {
	constructor(type: ExceptionUtils.ClassType, args?: any) {
		const typeName: string = ExceptionUtils.formatType(type.name);

		const error: ApiErrorDto = new ApiErrorDto();
		error.code = 'resource_not_found';
		error.message = args?.message || `${typeName} not found`;
		error.data = { type: typeName, ...args };

		super(error, HttpStatus.NOT_FOUND);
	}
}

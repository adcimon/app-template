import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../types/api-error.js';
import { ErrorCode } from '../types/error-code.js';
import { ExceptionUtils } from '../utils/exception.utils.js';

export class NotFoundException extends HttpException {
	constructor(type: ExceptionUtils.ClassType | string, args?: any) {
		const typeName: string = ExceptionUtils.formatType(typeof type === 'string' ? type : type.name);

		const error: ApiError = new ApiError(
			ErrorCode.NotFound,
			HttpStatus.NOT_FOUND,
			args?.message || `${typeName} not found`,
			{
				type: typeName,
				...args,
			},
		);

		super(error, error.status);
	}
}

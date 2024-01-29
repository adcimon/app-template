import { Catch, HttpException, HttpStatus, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDto } from '../dtos/error.dto';
import { GenericErrorException } from './generic-error.exception';
import { UnauthorizedException } from './unauthorized.exception';
import { ForbiddenException } from './forbidden.exception';
import { InvalidRequestException } from './invalid-request.exception';
const packageJson = require('../../package.json');

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const request = context.getRequest<Request>();
		const response = context.getResponse<Response>();

		// Check whether or not the exception has been handled by a custom exception.
		if (
			!(exception instanceof HttpException) ||
			(exception instanceof HttpException && !(exception.getResponse() instanceof ErrorDto))
		) {
			const status: number = this.getStatus(exception);
			switch (status) {
				case HttpStatus.UNAUTHORIZED:
					exception = new UnauthorizedException(exception?.message);
					break;
				case HttpStatus.FORBIDDEN:
					exception = new ForbiddenException(exception?.message);
					break;
				case HttpStatus.NOT_FOUND:
					exception = new InvalidRequestException(exception?.message);
					break;
				default:
					exception = new GenericErrorException(status, exception?.message);
					break;
			}
		}

		const body = {
			version: packageJson.version,
			endpoint: `${request.protocol}://${request.get('host')}${request.originalUrl}`,
			timestamp: new Date().toISOString(),
			error: exception.getResponse(),
		};

		response.status(exception.getStatus()).json(body);
	}

	getStatus(exception: any): number {
		return (
			(exception?.getStatus ? exception.getStatus() : undefined) ||
			exception['$metadata']?.httpStatusCode ||
			HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
}

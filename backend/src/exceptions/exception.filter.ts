import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { DocsService } from '../modules/docs/docs.service.js';
import { ApiResponse } from '../types/api-response.js';
import { ApiError } from '../types/api-error.js';
import { GenericErrorException } from './generic-error.exception.js';
import { UnauthorizedException } from './unauthorized.exception.js';
import { ForbiddenException } from './forbidden.exception.js';
import { InvalidRequestException } from './invalid-request.exception.js';
import { AppUtils } from '../utils/app.utils.js';
import { TimeUtils } from '../utils/time.utils.js';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
	public override catch(exception: any, host: ArgumentsHost): Response<any, Record<string, any>> {
		const context = host.switchToHttp();
		const request = context.getRequest<Request>();
		const response = context.getResponse<Response>();

		return this.handleException(request, response, exception);
	}

	private getStatus(exception: any): number {
		if (exception && typeof exception.getStatus === 'function') {
			return exception.getStatus();
		}

		if (exception?.['$metadata']?.httpStatusCode) {
			return exception['$metadata'].httpStatusCode;
		}

		return HttpStatus.INTERNAL_SERVER_ERROR;
	}

	private isUnmanaged(exception: any): boolean {
		if (!(exception instanceof HttpException)) {
			return true;
		}

		if (!(exception.getResponse() instanceof ApiError)) {
			return true;
		}

		return false;
	}

	private handleException(request: Request, response: Response, exception: any): Response<any, Record<string, any>> {
		if (this.isUnmanaged(exception)) {
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

		const apiResponse: ApiResponse = {
			version: AppUtils.getVersion(),
			endpoint: `${request.protocol}://${request.get('host')}${request.originalUrl}`,
			docs: `${request.protocol}://${request.get('host')}/${DocsService.OPENAPI_JSON_PATH}`,
			timestamp: TimeUtils.getNowISO(),
			error: exception.getResponse(),
		};

		return response.status(exception.getStatus()).json(apiResponse);
	}
}

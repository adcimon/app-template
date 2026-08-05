import { HttpException, HttpStatus } from '@nestjs/common';
import { jest } from '@jest/globals';
import { ApiError } from '../../src/types/api-error.js';
import { ErrorCode } from '../../src/types/error-code.js';
import { ExceptionFilter } from '../../src/exceptions/exception.filter.js';
import { UnauthorizedException } from '../../src/exceptions/unauthorized.exception.js';

const createMockHost = (path: string = '/users/me') => {
	const mockJson = jest.fn().mockReturnThis();
	const mockStatus = jest.fn(() => ({ json: mockJson }));
	return {
		switchToHttp: () => ({
			getRequest: () => ({
				path,
				protocol: 'https',
				get: (_name: string) => 'localhost',
				originalUrl: path,
			}),
			getResponse: () => ({
				status: mockStatus,
			}),
		}),
		mockStatus,
		mockJson,
	};
};

const createFilter = (): ExceptionFilter => {
	return Object.create(ExceptionFilter.prototype) as ExceptionFilter;
};

describe('ExceptionFilter', () => {
	let filter: ExceptionFilter;

	beforeEach(() => {
		filter = createFilter();
	});

	it('should handle managed HttpException with ApiError response', () => {
		const host = createMockHost();
		const error: ApiError = new ApiError(ErrorCode.GenericError, HttpStatus.BAD_REQUEST, 'Custom error message');
		const exception: HttpException = new HttpException(error, HttpStatus.BAD_REQUEST);

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error,
			}),
		);
	});

	it('should map 401 unmanaged exception to UnauthorizedException', () => {
		const host = createMockHost();
		const exception = { getStatus: () => HttpStatus.UNAUTHORIZED, message: 'Token expired' };

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error: expect.objectContaining({ code: 'unauthorized' }),
			}),
		);
	});

	it('should map 403 unmanaged exception to ForbiddenException', () => {
		const host = createMockHost();
		const exception = { getStatus: () => HttpStatus.FORBIDDEN, message: 'Access denied' };

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error: expect.objectContaining({ code: 'forbidden' }),
			}),
		);
	});

	it('should map 404 unmanaged exception to InvalidRequestException', () => {
		const host = createMockHost();
		const exception = { getStatus: () => HttpStatus.NOT_FOUND, message: 'Not found' };

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error: expect.objectContaining({ code: 'invalid_request' }),
			}),
		);
	});

	it('should map unknown status unmanaged exception to GenericErrorException', () => {
		const host = createMockHost();
		const exception = { getStatus: () => HttpStatus.BAD_GATEWAY, message: 'Upstream failure' };

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_GATEWAY);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error: expect.objectContaining({ code: 'generic_error' }),
			}),
		);
	});

	it('should wrap response in ApiResponse with version, endpoint, docs, timestamp', () => {
		const host = createMockHost('/users/me');
		const exception = new UnauthorizedException('No token');

		filter.catch(exception, host as any);

		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				version: expect.any(String),
				endpoint: 'https://localhost/users/me',
				docs: expect.stringContaining('docs/json'),
				timestamp: expect.any(String),
			}),
		);
	});

	it('should use $metadata.httpStatusCode when getStatus is not available', () => {
		const host = createMockHost();
		const exception = { $metadata: { httpStatusCode: HttpStatus.FORBIDDEN }, message: 'AWS forbidden' };

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error: expect.objectContaining({ code: 'forbidden' }),
			}),
		);
	});

	it('should default to 500 when no status available', () => {
		const host = createMockHost();
		const exception = { message: 'Unknown failure' };

		filter.catch(exception, host as any);

		expect(host.mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(host.mockJson).toHaveBeenCalledWith(
			expect.objectContaining({
				error: expect.objectContaining({ code: 'generic_error' }),
			}),
		);
	});
});

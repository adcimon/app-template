import { HttpStatus } from '@nestjs/common';
import { ApiError } from '../../src/types/api-error.js';
import { ConfigurationErrorException } from '../../src/exceptions/configuration-error.exception.js';
import { EmailTakenException } from '../../src/exceptions/email-taken.exception.js';
import { ForbiddenException } from '../../src/exceptions/forbidden.exception.js';
import { GenericErrorException } from '../../src/exceptions/generic-error.exception.js';
import { InvalidRequestException } from '../../src/exceptions/invalid-request.exception.js';
import { NotFoundException } from '../../src/exceptions/not-found.exception.js';
import { UnauthorizedException } from '../../src/exceptions/unauthorized.exception.js';
import { ValidationErrorException } from '../../src/exceptions/validation-error.exception.js';

class DummyEntity {}

describe('ConfigurationErrorException', () => {
	it('should create with default message', () => {
		const exception: ConfigurationErrorException = new ConfigurationErrorException();
		expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('configuration_error');
		expect(response.message).toBe('Configuration error');
	});

	it('should create with custom message', () => {
		const exception: ConfigurationErrorException = new ConfigurationErrorException('Custom config error');
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.message).toBe('Custom config error');
	});
});

describe('EmailTakenException', () => {
	it('should create with correct status and code', () => {
		const exception: EmailTakenException = new EmailTakenException('test@example.com');
		expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('email_taken');
		expect(response.message).toBe('Email is already being used');
		expect(response.detail).toEqual({ email: 'test@example.com' });
	});

	it('should handle undefined email', () => {
		const exception: EmailTakenException = new EmailTakenException();
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.detail).toEqual({ email: undefined });
	});
});

describe('ForbiddenException', () => {
	it('should create with default message', () => {
		const exception: ForbiddenException = new ForbiddenException();
		expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
		const response = exception.getResponse() as ApiError;
		expect(response.code).toBe('forbidden');
		expect(response.message).toBe('Forbidden');
	});

	it('should create with custom message', () => {
		const exception: ForbiddenException = new ForbiddenException('Access denied');
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.message).toBe('Access denied');
	});
});

describe('GenericErrorException', () => {
	it('should create with default status and message', () => {
		const exception: GenericErrorException = new GenericErrorException();
		expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('generic_error');
		expect(response.message).toBe('Generic error');
	});

	it('should create with custom status and message', () => {
		const exception: GenericErrorException = new GenericErrorException(HttpStatus.BAD_GATEWAY, 'Upstream failure');
		expect(exception.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
		const response = exception.getResponse() as ApiError;
		expect(response.message).toBe('Upstream failure');
	});
});

describe('InvalidRequestException', () => {
	it('should create with default message', () => {
		const exception: InvalidRequestException = new InvalidRequestException();
		expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('invalid_request');
		expect(response.message).toBe('Invalid request');
	});

	it('should create with custom message', () => {
		const exception: InvalidRequestException = new InvalidRequestException('Bad input');
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.message).toBe('Bad input');
	});
});

describe('NotFoundException', () => {
	it('should create with ClassType', () => {
		const exception: NotFoundException = new NotFoundException(DummyEntity);
		expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('not_found');
		expect(response.message).toBe('dummy entity not found');
		expect(response.detail).toEqual(expect.objectContaining({ type: 'dummy entity' }));
	});

	it('should create with string type', () => {
		const exception: NotFoundException = new NotFoundException('Resource');
		expect(exception.getStatus()).toBe(HttpStatus.NOT_FOUND);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('not_found');
		expect(response.message).toBe('resource not found');
	});

	it('should create with custom message in args', () => {
		const exception: NotFoundException = new NotFoundException(DummyEntity, { message: 'Gone' });
		const response = exception.getResponse() as ApiError;
		expect(response.message).toBe('Gone');
	});
});

describe('UnauthorizedException', () => {
	it('should create with default message', () => {
		const exception: UnauthorizedException = new UnauthorizedException();
		expect(exception.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('unauthorized');
		expect(response.message).toBe('Unauthorized');
	});

	it('should create with custom message', () => {
		const exception: UnauthorizedException = new UnauthorizedException('Token expired');
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.message).toBe('Token expired');
	});
});

describe('ValidationErrorException', () => {
	it('should create with default message', () => {
		const exception: ValidationErrorException = new ValidationErrorException();
		expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.code).toBe('validation_error');
		expect(response.message).toBe('Validation error');
	});

	it('should create with custom message', () => {
		const exception: ValidationErrorException = new ValidationErrorException('Field required');
		const response: ApiError = exception.getResponse() as ApiError;
		expect(response.message).toBe('Field required');
	});
});

import { ApiEnums } from '../api/api-enums.js';

export enum ErrorCode {
	GenericError = 'generic_error',
	InvalidRequest = 'invalid_request',
	ValidationError = 'validation_error',
	Unauthorized = 'unauthorized',
	Forbidden = 'forbidden',
	NotFound = 'not_found',
	EmailTaken = 'email_taken',
	ConfigurationError = 'configuration_error',
}

ApiEnums.register('ErrorCode', ErrorCode);

import { Injectable, ValidationError, ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { ValidationErrorException } from '../exceptions/validation-error.exception.js';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
	constructor() {
		super({
			whitelist: true,
			transform: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const firstError: ValidationError = errors[0];
				const message: string = firstError.constraints
					? Object.values(firstError.constraints)[0]
					: 'Validation error';
				return new ValidationErrorException(message);
			},
		});
	}
}

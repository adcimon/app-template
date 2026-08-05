import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidationPipe } from '../../src/validation/validation.pipe.js';
import { ValidationErrorException } from '../../src/exceptions/validation-error.exception.js';

class Simple {
	@IsString()
	name: string;
}

class Inner {
	@IsInt()
	n: number;
}

class Nested {
	@ValidateNested()
	@Type(() => Inner)
	inner: Inner;
}

describe('ValidationPipe (exceptionFactory)', () => {
	const pipe: ValidationPipe = new ValidationPipe();

	it('should throw ValidationErrorException on invalid input', async () => {
		await expect(pipe.transform({ name: 123 }, { type: 'body', metatype: Simple })).rejects.toBeInstanceOf(
			ValidationErrorException,
		);
	});

	it('should use the first constraint message as the exception message', async () => {
		let caught: any;
		try {
			await pipe.transform({ name: 123 }, { type: 'body', metatype: Simple });
		} catch (error: any) {
			caught = error;
		}
		expect(caught).toBeInstanceOf(ValidationErrorException);
		expect(caught.message).toMatch(/must be a string/);
	});

	it('should fall back to "Validation error" when the first error has no constraints', async () => {
		let caught: any;
		try {
			await pipe.transform({ inner: { n: 'x' } }, { type: 'body', metatype: Nested });
		} catch (error: any) {
			caught = error;
		}
		expect(caught).toBeInstanceOf(ValidationErrorException);
		expect(caught.message).toBe('Validation error');
	});

	it('should pass through valid input', async () => {
		const transformed: Simple = await pipe.transform({ name: 'Alice' }, { type: 'body', metatype: Simple });
		expect(transformed.name).toBe('Alice');
	});
});

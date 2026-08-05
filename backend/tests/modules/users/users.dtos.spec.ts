import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateEmailDto, UpdatePhoneDto, UpdateUserDto, UpdateIconDto } from '../../src/modules/users/users.dtos.js';

describe('User Dtos Validation', () => {
	describe('UpdateEmailDto', () => {
		it('should accept a valid body', async () => {
			const dto: UpdateEmailDto = plainToInstance(UpdateEmailDto, { email: 'user@example.com' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing email', async () => {
			const dto: UpdateEmailDto = plainToInstance(UpdateEmailDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid email format', async () => {
			const dto: UpdateEmailDto = plainToInstance(UpdateEmailDto, { email: 'not-valid' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('UpdatePhoneDto', () => {
		it('should accept an empty body', async () => {
			const dto: UpdatePhoneDto = plainToInstance(UpdatePhoneDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should accept a valid phone number', async () => {
			const dto: UpdatePhoneDto = plainToInstance(UpdatePhoneDto, { phone: '+1234567890' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject invalid phone format', async () => {
			const dto: UpdatePhoneDto = plainToInstance(UpdatePhoneDto, { phone: '12345' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('UpdateIconDto', () => {
		it('should accept an empty body', async () => {
			const dto: UpdateIconDto = plainToInstance(UpdateIconDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should accept a valid icon url', async () => {
			const dto: UpdateIconDto = plainToInstance(UpdateIconDto, { icon: 'https://cdn.example.com/icon.png' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject an unsupported extension', async () => {
			const dto: UpdateIconDto = plainToInstance(UpdateIconDto, { icon: 'https://cdn.example.com/icon.gif' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('UpdateUserDto', () => {
		it('should accept a valid body with only name', async () => {
			const dto: UpdateUserDto = plainToInstance(UpdateUserDto, { name: 'John' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should accept a valid body with all optional fields', async () => {
			const body = {
				name: 'John',
				surname: 'Doe',
				birthdate: '1990-01-15T00:00:00Z',
				locale: 'en-US',
				timezone: 'America/New_York',
			};
			const dto: UpdateUserDto = plainToInstance(UpdateUserDto, body);
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject a missing name', async () => {
			const dto: UpdateUserDto = plainToInstance(UpdateUserDto, { surname: 'Doe' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid name (starts with number)', async () => {
			const dto: UpdateUserDto = plainToInstance(UpdateUserDto, { name: '1John' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid surname (starts with number)', async () => {
			const dto: UpdateUserDto = plainToInstance(UpdateUserDto, { name: 'John', surname: '1Doe' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid birthdate format', async () => {
			const dto: UpdateUserDto = plainToInstance(UpdateUserDto, {
				name: 'John',
				birthdate: 'not-a-date',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});
});

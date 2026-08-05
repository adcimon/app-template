import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
	SignUpDto,
	SignDownDto,
	SignInDto,
	RefreshTokenDto,
	VerifyEmailDto,
	ForgotPasswordDto,
	ConfirmPasswordDto,
	ChangePasswordDto,
} from '../../src/modules/auth/auth.dtos.js';

describe('Auth Dtos Validation', () => {
	describe('SignUpDto', () => {
		it('should accept a valid body', async () => {
			const dto: SignUpDto = plainToInstance(SignUpDto, {
				email: 'user@example.com',
				password: 'secret123',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing email', async () => {
			const dto: SignUpDto = plainToInstance(SignUpDto, { password: 'secret123' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid email format', async () => {
			const dto: SignUpDto = plainToInstance(SignUpDto, {
				email: 'not-an-email',
				password: 'secret123',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject missing password', async () => {
			const dto: SignUpDto = plainToInstance(SignUpDto, { email: 'user@example.com' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('SignDownDto', () => {
		it('should accept a valid body', async () => {
			const dto: SignDownDto = plainToInstance(SignDownDto, { password: 'secret123' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing password', async () => {
			const dto: SignDownDto = plainToInstance(SignDownDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('SignInDto', () => {
		it('should accept a valid body', async () => {
			const dto: SignInDto = plainToInstance(SignInDto, {
				email: 'user@example.com',
				password: 'secret123',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing email', async () => {
			const dto: SignInDto = plainToInstance(SignInDto, { password: 'secret123' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid email format', async () => {
			const dto: SignInDto = plainToInstance(SignInDto, {
				email: 'bad-email',
				password: 'secret123',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject missing password', async () => {
			const dto: SignInDto = plainToInstance(SignInDto, { email: 'user@example.com' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('RefreshTokenDto', () => {
		it('should accept a valid body', async () => {
			const dto: RefreshTokenDto = plainToInstance(RefreshTokenDto, {
				refreshToken: 'some-token',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing refreshToken', async () => {
			const dto: RefreshTokenDto = plainToInstance(RefreshTokenDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('VerifyEmailDto', () => {
		it('should accept a valid body', async () => {
			const dto: VerifyEmailDto = plainToInstance(VerifyEmailDto, { code: '123456' });
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing code', async () => {
			const dto: VerifyEmailDto = plainToInstance(VerifyEmailDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('ForgotPasswordDto', () => {
		it('should accept a valid body', async () => {
			const dto: ForgotPasswordDto = plainToInstance(ForgotPasswordDto, {
				email: 'user@example.com',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing email', async () => {
			const dto: ForgotPasswordDto = plainToInstance(ForgotPasswordDto, {});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid email format', async () => {
			const dto: ForgotPasswordDto = plainToInstance(ForgotPasswordDto, {
				email: 'not-valid',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('ConfirmPasswordDto', () => {
		const validBody = { email: 'user@example.com', code: '123456', password: 'newpass123' };

		it('should accept a valid body', async () => {
			const dto: ConfirmPasswordDto = plainToInstance(ConfirmPasswordDto, validBody);
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing email', async () => {
			const { email, ...body } = validBody;
			const dto: ConfirmPasswordDto = plainToInstance(ConfirmPasswordDto, body);
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject invalid email format', async () => {
			const body = { ...validBody, email: 'bad' };
			const dto: ConfirmPasswordDto = plainToInstance(ConfirmPasswordDto, body);
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject missing code', async () => {
			const { code, ...body } = validBody;
			const dto: ConfirmPasswordDto = plainToInstance(ConfirmPasswordDto, body);
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject missing password', async () => {
			const { password, ...body } = validBody;
			const dto: ConfirmPasswordDto = plainToInstance(ConfirmPasswordDto, body);
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('ChangePasswordDto', () => {
		it('should accept a valid body', async () => {
			const dto: ChangePasswordDto = plainToInstance(ChangePasswordDto, {
				currentPassword: 'old123',
				newPassword: 'new456',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBe(0);
		});

		it('should reject missing currentPassword', async () => {
			const dto: ChangePasswordDto = plainToInstance(ChangePasswordDto, {
				newPassword: 'new456',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});

		it('should reject missing newPassword', async () => {
			const dto: ChangePasswordDto = plainToInstance(ChangePasswordDto, {
				currentPassword: 'old123',
			});
			const errors: ValidationError[] = await validate(dto);
			expect(errors.length).toBeGreaterThan(0);
		});
	});
});

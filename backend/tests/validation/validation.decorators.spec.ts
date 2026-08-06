import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { IsName } from '../../src/validation/is-name.decorator.js';
import { IsPhone } from '../../src/validation/is-phone.decorator.js';
import { IsIcon } from '../../src/validation/is-icon.decorator.js';

class NameTest {
	@IsName()
	name: string;
}

class PhoneTest {
	@IsPhone()
	phone: string;
}

class IconTest {
	@IsIcon()
	icon: string;
}

describe('validation decorators', () => {
	describe('IsName', () => {
		it.each(['Hello', '你好', 'こんにちは', 'Привет', 'مرحبا', 'Hello123', 'Hola mundo'])(
			'should accept valid name: "%s"',
			async (value: string) => {
				const nameTest: NameTest = plainToInstance(NameTest, { name: value });
				const errors: ValidationError[] = await validate(nameTest);
				expect(errors.length).toBe(0);
			},
		);

		it.each(['123Hello', ' leading'])('should reject invalid name: "%s"', async (value: string) => {
			const nameTest: NameTest = plainToInstance(NameTest, { name: value });
			const errors: ValidationError[] = await validate(nameTest);
			expect(errors.length).toBeGreaterThan(0);
		});
	});

	describe('IsPhone', () => {
		it.each(['+11234567890', '+441234567890', '+8613812345678'])(
			'should accept valid phone: "%s"',
			async (value: string) => {
				const phoneTest: PhoneTest = plainToInstance(PhoneTest, { phone: value });
				const errors: ValidationError[] = await validate(phoneTest);
				expect(errors.length).toBe(0);
			},
		);

		it.each(['1234567890', '+1 234567890', '+abc1234567890'])(
			'should reject invalid phone: "%s"',
			async (value: string) => {
				const phoneTest: PhoneTest = plainToInstance(PhoneTest, { phone: value });
				const errors: ValidationError[] = await validate(phoneTest);
				expect(errors.length).toBeGreaterThan(0);
			},
		);
	});

	describe('IsIcon', () => {
		it.each(['', 'https://cdn.example.com/image.png', 'https://cdn.example.com/path/photo.jpeg'])(
			'should accept valid icon: "%s"',
			async (value: string) => {
				const iconTest: IconTest = plainToInstance(IconTest, { icon: value });
				const errors: ValidationError[] = await validate(iconTest);
				expect(errors.length).toBe(0);
			},
		);

		it.each(['https://example.com/image.gif', 'not-a-url'])(
			'should reject invalid icon: "%s"',
			async (value: string) => {
				const iconTest: IconTest = plainToInstance(IconTest, { icon: value });
				const errors: ValidationError[] = await validate(iconTest);
				expect(errors.length).toBeGreaterThan(0);
			},
		);
	});
});

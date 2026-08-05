import { of } from 'rxjs';
import { PasswordInterceptor } from '../../src/interceptors/password.interceptor.js';

const createMockContext = (body: any) => ({
	switchToHttp: () => ({
		getRequest: () => ({ body }),
	}),
});

const mockHandler = { handle: () => of('response') };

describe('PasswordInterceptor', () => {
	let interceptor: PasswordInterceptor;

	beforeEach(() => {
		interceptor = new PasswordInterceptor();
	});

	it('should decode base64 password', (done) => {
		const encoded: string = Buffer.from('testPassword').toString('base64');
		const body = { password: encoded };
		const context = createMockContext(body);

		interceptor.intercept(context as any, mockHandler as any).subscribe(() => {
			expect(body.password).toBe('testPassword');
			done();
		});
	});

	it('should decode base64 currentPassword', (done) => {
		const encoded: string = Buffer.from('testPassword').toString('base64');
		const body = { currentPassword: encoded };
		const context = createMockContext(body);

		interceptor.intercept(context as any, mockHandler as any).subscribe(() => {
			expect(body.currentPassword).toBe('testPassword');
			done();
		});
	});

	it('should decode base64 newPassword', (done) => {
		const encoded: string = Buffer.from('testPassword').toString('base64');
		const body = { newPassword: encoded };
		const context = createMockContext(body);

		interceptor.intercept(context as any, mockHandler as any).subscribe(() => {
			expect(body.newPassword).toBe('testPassword');
			done();
		});
	});

	it('should handle body without password fields', (done) => {
		const body = { name: 'test' };
		const context = createMockContext(body);

		interceptor.intercept(context as any, mockHandler as any).subscribe(() => {
			expect(body.name).toBe('test');
			done();
		});
	});

	it('should handle null body', (done) => {
		const context = createMockContext(null);

		interceptor.intercept(context as any, mockHandler as any).subscribe((value) => {
			expect(value).toBe('response');
			done();
		});
	});
});

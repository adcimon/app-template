import { of, lastValueFrom } from 'rxjs';
import { ResponseInterceptor } from '../../src/interceptors/response.interceptor.js';
import { DocsService } from '../../src/modules/docs/docs.service.js';
import { ApiResponse } from '../../src/types/api-response.js';

const makeContext = (req: any): any => ({
	switchToHttp: () => ({ getRequest: () => req }),
});

const makeHandler = (data: any): any => ({ handle: () => of(data) });

describe('ResponseInterceptor', () => {
	const interceptor = new ResponseInterceptor();
	const request = { protocol: 'https', get: (_: string) => 'example.com', originalUrl: '/users/me' };

	it('should wrap the handler data in an ApiResponse envelope', async () => {
		const data = { id: 'usr_1' };
		const response: ApiResponse = await lastValueFrom(interceptor.intercept(makeContext(request), makeHandler(data)));

		expect(response.data).toEqual(data);
		expect(response.endpoint).toBe('https://example.com/users/me');
		expect(response.docs).toContain(DocsService.DOCS_JSON_PATH);
		expect(typeof response.version).toBe('string');
		expect(typeof response.timestamp).toBe('string');
	});

	it('should preserve falsy/empty data', async () => {
		const response: ApiResponse = await lastValueFrom(interceptor.intercept(makeContext(request), makeHandler(null)));
		expect(response.data).toBeNull();
	});
});

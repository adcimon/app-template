import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { DocsService } from '../modules/docs/docs.service.js';
import { ApiResponse } from '../types/api-response.js';
import { AppUtils } from '../utils/app.utils.js';
import { TimeUtils } from '../utils/time.utils.js';

export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((data: any) => {
				const request: any = context.switchToHttp().getRequest();

				const apiResponse: ApiResponse = {
					version: AppUtils.getVersion(),
					endpoint: `${request.protocol}://${request.get('host')}${request.originalUrl}`,
					docs: `${request.protocol}://${request.get('host')}/${DocsService.OPENAPI_JSON_PATH}`,
					timestamp: TimeUtils.getNowISO(),
					data: data,
				};

				return apiResponse;
			}),
		);
	}
}

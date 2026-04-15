import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto.js';
import { TimeUtils } from '../utils/time.utils.js';
import packageJson from '../../package.json' with { type: 'json' };

export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((data: any) => {
				const request: any = context.switchToHttp().getRequest();

				const dto: ResponseDto = {
					version: packageJson.version,
					endpoint: `${request.protocol}://${request.get('host')}${request.originalUrl}`,
					timestamp: TimeUtils.getNowISO(),
					data: data,
				};

				return dto;
			}),
		);
	}
}

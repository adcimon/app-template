import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import packageJson from '../../package.json' with { type: 'json' };

export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((data: any) => {
				const request: any = context.switchToHttp().getRequest();

				const body: any = {};
				body.version = packageJson.version;
				body.endpoint = `${request.protocol}://${request.get('host')}${request.originalUrl}`;
				body.timestamp = new Date().toISOString();
				body.data = data;

				return body;
			}),
		);
	}
}

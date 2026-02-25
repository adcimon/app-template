import { Injectable, NestInterceptor, ClassSerializerInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SerializerInterceptor extends ClassSerializerInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return super.intercept(context, next);
	}
}

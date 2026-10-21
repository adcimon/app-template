import { CallHandler, ClassSerializerInterceptor, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SerializerInterceptor extends ClassSerializerInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
		return super.intercept(context, next);
	}
}

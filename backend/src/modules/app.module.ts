import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { CognitoModule } from './aws/cognito/cognito.module';
import { BodyParserMiddleware } from '../middlewares/body-parser.middleware';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { SerializerInterceptor } from '../interceptors/serializer.interceptor';
import { ExceptionFilter } from '../exceptions/exception.filter';

@Module({
	imports: [
		// Base
		ConfigModule,
		// API
		AuthModule,
		UsersModule,
		AdminModule,
		// AWS
		CognitoModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: SerializerInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: ExceptionFilter,
		},
	],
})
export class AppModule implements NestModule {
	private readonly logger: Logger = new Logger(AppModule.name);

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BodyParserMiddleware).forRoutes('*');
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}

	public async startup(app: NestExpressApplication) {
		this.logger.log('⚙️ Startup');
	}
}

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvModule } from './env/env.module.js';
import { ConfigModule } from './config/config.module.js';
import { EventBrokerModule } from './event-broker/event-broker.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { AdminModule } from './admin/admin.module.js';
import { CognitoModule } from './aws/cognito/cognito.module.js';
import { BodyParserMiddleware } from '../middlewares/body-parser.middleware.js';
import { LoggerMiddleware } from '../middlewares/logger.middleware.js';
import { SerializerInterceptor } from '../interceptors/serializer.interceptor.js';
import { ExceptionFilter } from '../exceptions/exception.filter.js';

@Module({
	imports: [
		// Base
		EnvModule,
		ConfigModule,
		EventBrokerModule,
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

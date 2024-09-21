import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CognitoModule } from './aws/cognito/cognito.module';
import { LoggerMiddleware } from '../log/logger.middleware';

@Module({
	imports: [ConfigModule, AuthModule, UsersModule, CognitoModule],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}

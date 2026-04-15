import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module.js';
import { EventBrokerModule } from '../event-broker/event-broker.module.js';
import { UsersModule } from '../users/users.module.js';
import { CognitoModule } from '../aws/cognito/cognito.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
	imports: [
		// Base
		ConfigModule,
		EventBrokerModule,
		// API
		UsersModule,
		// AWS
		CognitoModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}

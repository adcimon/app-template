import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module.js';
import { CognitoModule } from '../aws/cognito/cognito.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
	imports: [
		// Base
		ConfigModule,
		// AWS
		CognitoModule,
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}

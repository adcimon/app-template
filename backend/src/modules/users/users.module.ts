import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CognitoModule } from '../aws/cognito/cognito.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

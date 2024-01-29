import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CognitoModule } from '../cognito/cognito.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [ConfigModule, CognitoModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}

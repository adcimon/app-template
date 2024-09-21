import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { CognitoModule } from '../aws/cognito/cognito.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule, UsersModule, CognitoModule],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}

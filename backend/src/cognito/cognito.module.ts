import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CognitoService } from './cognito.service';

@Module({
	imports: [ConfigModule],
	controllers: [],
	providers: [CognitoService],
	exports: [CognitoService],
})
export class CognitoModule {}

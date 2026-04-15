import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module.js';
import { CognitoService } from './cognito.service.js';

@Module({
	imports: [
		// Base
		ConfigModule,
	],
	controllers: [],
	providers: [CognitoService],
	exports: [CognitoService],
})
export class CognitoModule {}

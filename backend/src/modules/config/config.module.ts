import { Global, Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module.js';
import { ConfigService } from './config.service.js';

@Global()
@Module({
	imports: [EnvModule],
	controllers: [],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}

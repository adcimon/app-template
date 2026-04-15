import { Global, Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { ConfigService } from './config.service';

@Global()
@Module({
	imports: [EnvModule],
	controllers: [],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}

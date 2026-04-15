import { Global, Module } from '@nestjs/common';
import { EnvService } from './env.service.js';

@Global()
@Module({
	imports: [],
	controllers: [],
	providers: [EnvService],
	exports: [EnvService],
})
export class EnvModule {}

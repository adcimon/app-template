import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface.js';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface.js';
import { AppModule } from './modules/app.module.js';
import { EnvService } from './modules/env/env.service.js';
import * as fs from 'fs';

async function main() {
	EnvService.initialize();

	const port: number = EnvService.getVariable<number>('PORT', 9000);
	const enableHttps: boolean = EnvService.getVariable<boolean>('ENABLE_HTTPS', false);
	const keyPath: string = EnvService.getVariable('KEY_PATH', '');
	const certPath: string = EnvService.getVariable('CERT_PATH', '');
	const enableCors: boolean = EnvService.getVariable<boolean>('ENABLE_CORS', true);
	const allowOrigins: string | string[] = EnvService.getVariable<string | string[]>('ALLOW_ORIGINS', '*');
	const allowCredentials: boolean = EnvService.getVariable<boolean>('ALLOW_CREDENTIALS', true);

	let httpsOptions: HttpsOptions = null;
	if (enableHttps) {
		httpsOptions = {};
		httpsOptions['key'] = fs.readFileSync(keyPath);
		httpsOptions['cert'] = fs.readFileSync(certPath);
	}

	let corsOptions: CorsOptions = null;
	if (enableCors) {
		const isAllowOriginsWildcard =
			allowOrigins === '*' || (Array.isArray(allowOrigins) && allowOrigins.includes('*'));

		if (isAllowOriginsWildcard && allowCredentials) {
			console.error(
				'❌ Invalid CORS configuration: Cannot use origin "*" when credentials are enabled. Please specify explicit allowed origins.',
			);
			process.exit(1);
		}

		corsOptions = {
			origin: allowOrigins,
			credentials: allowCredentials,
		};
	}

	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions: httpsOptions,
		cors: corsOptions,
	});

	await app.init();

	await app.listen(port);

	const appModule: AppModule = app.get(AppModule);
	await appModule.startup(app);

	const url: string = await app.getUrl();
	console.log(`🚀 Service running on ${url}`);
}

main();

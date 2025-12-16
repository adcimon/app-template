import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ConfigService } from './modules/config/config.service';
import * as express from 'express';
import * as fs from 'fs';

async function main() {
	ConfigService.config();

	const port: number = await ConfigService.getEnvironmentVariable<number>('PORT', 9000);
	const enableHttps: boolean = await ConfigService.getEnvironmentVariable<boolean>('ENABLE_HTTPS', false);
	const keyPath: string = await ConfigService.getEnvironmentVariable('KEY_PATH', '');
	const certPath: string = await ConfigService.getEnvironmentVariable('CERT_PATH', '');
	const enableCors: boolean = await ConfigService.getEnvironmentVariable<boolean>('ENABLE_CORS', true);
	const allowOrigins: string | string[] = await ConfigService.getEnvironmentVariable<string | string[]>(
		'ALLOW_ORIGINS',
		'*',
	);
	const maxRequestSize: string = await ConfigService.getEnvironmentVariable('MAX_REQUEST_SIZE', '50mb');

	let httpsOptions: HttpsOptions = null;
	if (enableHttps) {
		httpsOptions = {};
		httpsOptions['key'] = fs.readFileSync(keyPath);
		httpsOptions['cert'] = fs.readFileSync(certPath);
	}

	let corsOptions: CorsOptions = null;
	if (enableCors) {
		corsOptions = allowOrigins ? { origin: allowOrigins } : null;
	}

	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions: httpsOptions,
		cors: corsOptions,
	});
	app.useGlobalFilters(new HttpExceptionFilter());

	app.use(
		express.json({
			limit: maxRequestSize,
		}),
	);
	app.use(
		express.urlencoded({
			limit: maxRequestSize,
			extended: true,
		}),
	);

	await app.listen(port);

	const url: string = await app.getUrl();
	console.log(`🚀 Service running on ${url}`);
}

main();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ConfigService } from './config/config.service';
import * as express from 'express';
import * as fs from 'fs';

async function bootstrap() {
	const enableHttps: boolean = await ConfigService.getEnvironmentVariable('ENABLE_HTTPS');
	let httpsOptions: HttpsOptions = null;
	if (enableHttps) {
		const keyPath: string = await ConfigService.getEnvironmentVariable('KEY_PATH');
		const certPath: string = await ConfigService.getEnvironmentVariable('CERT_PATH');
		httpsOptions = {};
		httpsOptions['key'] = fs.readFileSync(keyPath);
		httpsOptions['cert'] = fs.readFileSync(certPath);
	}

	const enableCors: boolean = await ConfigService.getEnvironmentVariable('ENABLE_CORS');
	let corsOptions: CorsOptions = null;
	if (enableCors) {
		const allowOrigins: string[] = await ConfigService.getEnvironmentVariable('ALLOW_ORIGINS');
		corsOptions = allowOrigins ? { origin: allowOrigins } : null;
	}

	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions: httpsOptions,
		cors: corsOptions,
	});
	app.useGlobalFilters(new HttpExceptionFilter());

	const maxRequestSize: string = await ConfigService.getEnvironmentVariable('MAX_REQUEST_SIZE');
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

	const port: number = await ConfigService.getEnvironmentVariable('PORT');
	await app.listen(port || 9000);

	const url: string = await app.getUrl();
	console.log(`🚀 Service running on: ${url}`);
}

ConfigService.config();
bootstrap();

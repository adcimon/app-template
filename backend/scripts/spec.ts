import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../src/modules/app.module.js';
import { DocsService } from '../src/modules/docs/docs.service.js';

async function main(): Promise<void> {
	try {
		const app: INestApplication = await NestFactory.create(AppModule, {
			logger: false,
			abortOnError: false,
		});

		const document: OpenAPIObject = DocsService.createDocument(app);

		const outputPath: string = path.resolve(process.cwd(), 'openapi.json');

		fs.writeFileSync(outputPath, JSON.stringify(document, null, 4), 'utf-8');

		console.log('Spec generated at:', outputPath);

		await app.close();
	} catch (error: any) {
		console.error(error);
		process.exit(1);
	}
}

main();

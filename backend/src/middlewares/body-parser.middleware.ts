import { Injectable, NestMiddleware } from '@nestjs/common';
import { EnvService } from '../modules/env/env.service.js';
import * as express from 'express';

@Injectable()
export class BodyParserMiddleware implements NestMiddleware {
	private jsonParser;
	private urlencodedParser;

	constructor() {
		const maxRequestSize: string = EnvService.getVariable<string>('MAX_REQUEST_SIZE', '50mb');

		this.jsonParser = express.json({
			limit: maxRequestSize,
		});

		this.urlencodedParser = express.urlencoded({
			limit: maxRequestSize,
			extended: true,
		});
	}

	use(req: any, res: any, next: () => void) {
		this.jsonParser(req, res, (err) => {
			if (err) {
				return next();
			}
			this.urlencodedParser(req, res, next);
		});
	}
}

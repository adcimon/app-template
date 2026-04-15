import { Injectable, Logger } from '@nestjs/common';
import { EnvService } from '../env/env.service.js';
import { ConfigurationErrorException } from '../../exceptions/configuration-error.exception.js';

@Injectable()
export class ConfigService {
	private readonly logger: Logger = new Logger(ConfigService.name);

	constructor(
		// Base
		private readonly envService: EnvService,
	) {}

	public getEnvironmentVariable<T = string>(key: string, defaultValue?: T): T {
		return this.envService.getVariable<T>(key, defaultValue);
	}

	public async getVariable<T = string>(key: string, defaultValue?: T): Promise<any> {
		try {
			const value: T = this.getEnvironmentVariable<T>(key, defaultValue);
			return value;
		} catch (error: any) {
			this.logger.log(error);
			throw new ConfigurationErrorException(error.message);
		}
	}
}

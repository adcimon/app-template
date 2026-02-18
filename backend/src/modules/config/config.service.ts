import { Injectable, Logger } from '@nestjs/common';
import { ConfigurationErrorException } from '../../exceptions/configuration-error.exception';
import { config } from 'dotenv';

@Injectable()
export class ConfigService {
	private readonly logger: Logger = new Logger(ConfigService.name);

	public static config(): any {
		config();
		if (process.env.NODE_ENV !== 'production') {
			console.log('Environment variables:');
			Object.keys(process.env).forEach((key: string) => {
				console.log(key + '=' + process.env[key]);
			});
		}
	}

	private static parse(value: string): unknown {
		if (value === '') {
			return value;
		}

		if (value === 'true') {
			return true;
		}

		if (value === 'false') {
			return false;
		}

		const numeric: number = Number(value);
		if (!isNaN(numeric)) {
			return numeric;
		}

		try {
			const obj: object = JSON.parse(value);
			return obj;
		} catch {}

		const array: string[] = value.split(',');
		if (array.length === 0) {
			return value;
		}
		if (array.length === 1) {
			return array[0];
		}
		if (array.length > 1) {
			return array;
		}

		return value;
	}

	public static async getEnvironmentVariable<T = string>(key: string, defaultValue?: T): Promise<T> {
		if (!(key in process.env)) {
			return defaultValue;
		}

		const value: string = process.env[key];
		const parsedValue: T = ConfigService.parse(value) as T;

		return parsedValue;
	}

	public async getVariable<T = string>(key: string, defaultValue?: T): Promise<any> {
		try {
			const value: T = await ConfigService.getEnvironmentVariable<T>(key, defaultValue);
			return value;
		} catch (error: any) {
			this.logger.log(error);
			throw new ConfigurationErrorException(error.message);
		}
	}
}

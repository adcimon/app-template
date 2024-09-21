import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export class ConfigService {
	public static config(): any {
		config();
		console.log('Environment variables:');
		Object.keys(process.env).forEach(function (key) {
			console.log(key + '=' + process.env[key]);
		});
	}

	private static parse(value: string): any {
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
		} catch (error: any) {
			// Ignore errors.
		}

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
	}

	public static async getEnvironmentVariable(key: string, defaultValue: any = null): Promise<any> {
		if (!(key in process.env)) {
			console.log(`Environment variable not found: ${key}`);
			return defaultValue;
		}

		const value: string = process.env[key];

		return ConfigService.parse(value);
	}

	public async get(key: string, defaultValue: any = null): Promise<any> {
		return await ConfigService.getEnvironmentVariable(key, defaultValue);
	}
}

import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export class EnvService {
	public static initialize(): any {
		config();
		if (process.env.NODE_ENV !== 'production') {
			console.log('Environment variables:');
			Object.keys(process.env).forEach((key: string) => {
				console.log(key + '=' + process.env[key]);
			});
		}
	}

	public static parse(value: string): unknown {
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

	public static getVariable<T = string>(key: string, defaultValue?: T): T {
		if (!(key in process.env)) {
			return defaultValue;
		}

		const value: string = process.env[key];
		const parsedValue: T = EnvService.parse(value) as T;

		return parsedValue;
	}

	public getVariable<T = string>(key: string, defaultValue?: T): T {
		return EnvService.getVariable(key, defaultValue);
	}
}

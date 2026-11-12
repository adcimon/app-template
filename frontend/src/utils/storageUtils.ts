import { StorageKey } from '../types/storageKey';

export namespace StorageUtils {
	export const get = <T>(key: StorageKey, defaultValue: T): T => {
		try {
			const value: string | null = localStorage.getItem(key);
			if (value === null) {
				return defaultValue;
			}

			switch (typeof defaultValue) {
				case 'string':
					return value as T;
				case 'number': {
					const number: number = Number(value);
					return (Number.isNaN(number) ? defaultValue : number) as T;
				}
				case 'boolean':
					return (value === 'true') as T;
				default:
					return JSON.parse(value) as T;
			}
		} catch {
			return defaultValue;
		}
	};

	export const set = <T>(key: StorageKey, value: T): void => {
		try {
			localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
		} catch {}
	};

	export const remove = (key: StorageKey): void => {
		try {
			localStorage.removeItem(key);
		} catch {}
	};
}

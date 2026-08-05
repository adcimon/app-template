import { cloneDeep, mergeWith } from 'es-toolkit/object';
import { isEqual } from 'es-toolkit/predicate';

export namespace ObjectUtils {
	export type Primitive = string | number | boolean | symbol | null | undefined;

	export type Keys<T, Prefix extends string = ''> = {
		[K in keyof T]: NonNullable<T[K]> extends Primitive
			? `${Prefix}${K & string}`
			: NonNullable<T[K]> extends Array<any>
				? `${Prefix}${K & string}`
				: `${Prefix}${K & string}` | Keys<NonNullable<T[K]>, `${Prefix}${K & string}.`>;
	}[keyof T];

	export type ValueAtKey<T, K extends string> = K extends `${infer Key}.${infer Rest}`
		? Key extends keyof T
			? ValueAtKey<NonNullable<T[Key]>, Rest>
			: never
		: K extends keyof T
			? T[K]
			: never;

	export const getKeys = (obj: any, prefix: string = ''): string[] => {
		if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
			return [];
		}

		return Object.keys(obj).flatMap((key: string) => {
			const path: string = prefix ? `${prefix}.${key}` : key;
			const value: any = obj[key];

			return value !== null && typeof value === 'object' && !Array.isArray(value)
				? ObjectUtils.getKeys(value, path)
				: [path];
		});
	};

	export const getNestedValue = (obj: any, path: string): any => {
		return path.split('.').reduce((acc, part) => acc?.[part], obj);
	};

	export const set = <T, K extends Keys<T>>(obj: T, key: K, value: ValueAtKey<T, K>) => {
		const keys: string[] = (key as string).split('.');
		const newObj: T = { ...obj };
		let current: any = newObj;

		for (let i = 0; i < keys.length - 1; i++) {
			const k: string = keys[i];
			current[k] = { ...current[k] };
			current = current[k];
		}

		current[keys[keys.length - 1]] = value;

		return newObj;
	};

	export const equals = <T>(a: T, b: T, keys?: Keys<T>[]): boolean => {
		if (a === b) {
			return true;
		}

		if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
			return false;
		}

		if (keys && keys.length > 0) {
			for (const key of keys) {
				const aValue: any = ObjectUtils.getNestedValue(a, key as string);
				const bValue: any = ObjectUtils.getNestedValue(b, key as string);
				if (!isEqual(aValue, bValue)) {
					return false;
				}
			}

			return true;
		}

		return isEqual(a, b);
	};

	export const deepMerge = <T extends object>(target: T, source: object): T => {
		const replaceArrays = (targetValue: unknown, sourceValue: unknown) => {
			if (Array.isArray(sourceValue)) {
				return sourceValue;
			}
		};

		const merged: T = mergeWith(cloneDeep(target), source, replaceArrays) as T;

		return merged;
	};
}

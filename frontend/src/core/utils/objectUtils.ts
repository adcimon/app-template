export namespace ObjectUtils {
	export type Primitive = string | number | boolean | symbol | null | undefined;

	export type Keys<T, Prefix extends string = ''> = {
		[K in keyof T]: T[K] extends Primitive
			? `${Prefix}${K & string}`
			: T[K] extends Array<any>
			? `${Prefix}${K & string}`
			: `${Prefix}${K & string}` | Keys<T[K], `${Prefix}${K & string}.`>;
	}[keyof T];

	export type ValueAtKey<T, K extends string> = K extends `${infer Key}.${infer Rest}`
		? Key extends keyof T
			? ValueAtKey<T[Key], Rest>
			: never
		: K extends keyof T
		? T[K]
		: never;

	export const getNestedValue = (obj: any, path: string): any => {
		return path.split('.').reduce((acc, part) => acc?.[part], obj);
	};

	export const set = <T, K extends Keys<T>>(obj: T, path: K, value: ValueAtKey<T, K>) => {
		const keys: string[] = (path as string).split('.');
		const newObj: T = { ...obj };
		let current: any = newObj;

		for (let i = 0; i < keys.length - 1; i++) {
			const key: string = keys[i];
			current[key] = { ...current[key] };
			current = current[key];
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
				if (!ObjectUtils.deepEquals(aValue, bValue)) {
					return false;
				}
			}

			return true;
		}

		return ObjectUtils.deepEquals(a, b);
	};

	export const deepEquals = (a: any, b: any): boolean => {
		if (a === b) {
			return true;
		}

		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) {
				return false;
			}

			return a.every((value, i) => ObjectUtils.deepEquals(value, b[i]));
		}

		if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
			return false;
		}

		const aKeys: (string | symbol)[] = Reflect.ownKeys(a);
		const bKeys: (string | symbol)[] = Reflect.ownKeys(b);
		if (aKeys.length !== bKeys.length) {
			return false;
		}

		for (const key of aKeys) {
			if (!bKeys.includes(key)) {
				return false;
			}

			if (!ObjectUtils.deepEquals(a[key], b[key])) {
				return false;
			}
		}

		return true;
	};
}

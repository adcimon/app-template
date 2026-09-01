import { Transform, TransformFnParams } from 'class-transformer';

export const ToArray = () =>
	Transform(({ value }: TransformFnParams) => {
		if (value === undefined || value === null) {
			return value;
		}

		const values: unknown[] = Array.isArray(value) ? value : [value];

		return values
			.flatMap((v: unknown) => (typeof v === 'string' ? v.split(',') : [v]))
			.map((v: unknown) => (typeof v === 'string' ? v.trim() : v))
			.filter((v: unknown) => v !== '');
	});

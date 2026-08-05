import { Mapper } from './mapper.js';

export class PartialMapper<TSource extends object, TTarget extends Partial<TSource>> extends Mapper<TSource, TTarget> {
	constructor(private readonly target: new () => TTarget) {
		super();
	}

	protected transform(source: TSource): TTarget {
		const instance: TTarget = new this.target();

		for (const key of Object.keys(instance) as (keyof TTarget)[]) {
			instance[key] = (source as unknown as TTarget)[key];
		}

		return instance;
	}
}

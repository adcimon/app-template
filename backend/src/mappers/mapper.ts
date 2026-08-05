export abstract class Mapper<TSource, TTarget> {
	protected abstract transform(source: TSource): TTarget;

	public map(source: TSource): TTarget;
	public map(source: TSource[]): TTarget[];
	public map(source: TSource | TSource[]): TTarget | TTarget[] {
		return Array.isArray(source) ? source.map((s: TSource) => this.transform(s)) : this.transform(source);
	}
}

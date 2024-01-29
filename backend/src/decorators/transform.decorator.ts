export function Transform(transform: any) {
	return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			const result: any = await originalMethod.apply(this, args);
			if (Array.isArray(result)) {
				return result.map((value: any) => transform(value));
			} else {
				return transform(result);
			}
		};

		return descriptor;
	};
}

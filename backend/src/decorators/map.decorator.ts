export function Map(map: any) {
	return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			const result: any = await originalMethod.apply(this, args);
			if (Array.isArray(result)) {
				return result.map((value: any) => map(value));
			} else {
				return map(result);
			}
		};

		return descriptor;
	};
}

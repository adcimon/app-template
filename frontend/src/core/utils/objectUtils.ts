export namespace ObjectUtils {
	export const equals = <T extends {}>(obj1: T, obj2: T, keys?: string[]) => {
		return (keys || Object.keys(obj1)).every((key: string) => (obj1 as any)[key] === (obj2 as any)[key]);
	};
}

export namespace ExceptionUtils {
	export type ClassType<T = any> = new (...args: any[]) => T;

	export const formatType = (type: string): string => {
		const cleaned: string = type.replace(/dto$/i, '');
		const words: RegExpMatchArray = cleaned.match(/([A-Z]+(?=[A-Z][a-z])|[A-Z][a-z]+|[a-z]+)/g);

		if (!words) {
			const tag: string = cleaned.toLowerCase();
			return tag;
		}

		const tag: string = words.map((word: string) => word.toLowerCase()).join(' ');
		return tag;
	};
}

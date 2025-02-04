export namespace CryptoUtils {
	export const encodeBase64 = (str: string): string => {
		const base64: string = btoa(str);
		return base64;
	};

	export const decodeBase64 = (base64: string): string => {
		const str: string = atob(base64);
		return str;
	};
}

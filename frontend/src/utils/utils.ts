export namespace Utils {
	export const EMAIL_REGEXP: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	export const PHONE_REGEXP: RegExp = /^(^$)|(\+[0-9]*)$/;
	export const AVATAR_REGEXP: RegExp = /^(^$)|(([^]*)(\.)(jpg|jpeg|png))$/;

	export const copyToClipboard = (text: string): void => {
		navigator.clipboard.writeText(text);
	};

	export const readImage = async (file: File): Promise<string> => {
		const promise: Promise<string> = new Promise((resolve, reject) => {
			const reader: FileReader = new FileReader();

			reader.onload = () => {
				const result: string = reader.result as string;
				resolve(result);
			};
			reader.onerror = (error: any) => {
				reject(error);
			};

			reader.readAsDataURL(file);
		});

		return promise;
	};

	export const getPlaceholderAvatar = (user: any): string => {
		return `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.name || Math.random() * 1000}`;
	};
}

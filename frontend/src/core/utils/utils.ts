export namespace Utils {
	export const copyToClipboard = (text: string) => {
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
}

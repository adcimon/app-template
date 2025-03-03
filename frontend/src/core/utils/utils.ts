export namespace Utils {
	export const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	export const downloadFile = (name: string, content: string) => {
		const element: HTMLAnchorElement = document.createElement('a');
		element.style.display = 'none';
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
		element.setAttribute('download', name);

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
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

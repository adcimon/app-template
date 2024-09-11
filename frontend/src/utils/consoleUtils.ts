export namespace ConsoleUtils {
	const WHITE_COLOR: string = '#cccccc';
	const RED_COLOR: string = '#c50f1f';
	const GREEN_COLOR: string = '#13a10e';
	const YELLOW_COLOR: string = '#c19c00';
	const CYAN_COLOR: string = '#3a96dd';

	const BASE_COLOR: string = WHITE_COLOR;
	const POST_COLOR: string = GREEN_COLOR;
	const GET_COLOR: string = CYAN_COLOR;
	const PUT_COLOR: string = YELLOW_COLOR;
	const PATCH_COLOR: string = YELLOW_COLOR;
	const DELETE_COLOR: string = RED_COLOR;

	const getMethodColor = (method: string): string => {
		let color: string = BASE_COLOR;
		switch (method) {
			case 'POST':
				color = POST_COLOR;
				break;
			case 'GET':
				color = GET_COLOR;
				break;
			case 'PUT':
				color = PUT_COLOR;
				break;
			case 'PATCH':
				color = PATCH_COLOR;
				break;
			case 'DELETE':
				color = DELETE_COLOR;
				break;
		}

		return `color:${color}`;
	};

	const getStatusColor = (status: number): string => {
		let color: string = GREEN_COLOR;
		if (status >= 400) {
			color = RED_COLOR;
		}

		return `color:${color}`;
	};

	export const logRequest = (method: string, endpoint: string, data: any): void => {
		console.log('%c%s %s%o', getMethodColor(method), method, endpoint, data);
	};

	export const logResponse = (status: number, endpoint: string, body: any): void => {
		console.log('%c%s %s%o', getStatusColor(status), status, endpoint, body);
	};
}

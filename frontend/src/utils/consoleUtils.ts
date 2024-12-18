export namespace ConsoleUtils {
	const WHITE_COLOR: string = '#cccccc';
	const RED_COLOR: string = '#c50f1f';
	const GREEN_COLOR: string = '#13a10e';
	const YELLOW_COLOR: string = '#c19c00';
	const CYAN_COLOR: string = '#3a96dd';
	const GREY_COLOR: string = '#767676';

	const BASE_COLOR: string = WHITE_COLOR;
	const POST_COLOR: string = GREEN_COLOR;
	const GET_COLOR: string = CYAN_COLOR;
	const PUT_COLOR: string = YELLOW_COLOR;
	const PATCH_COLOR: string = YELLOW_COLOR;
	const DELETE_COLOR: string = RED_COLOR;

	const getMethodColor = (method: string): string => {
		switch (method) {
			case 'POST':
				return POST_COLOR;
			case 'GET':
				return GET_COLOR;
			case 'PUT':
				return PUT_COLOR;
			case 'PATCH':
				return PATCH_COLOR;
			case 'DELETE':
				return DELETE_COLOR;
			default:
				return BASE_COLOR;
		}
	};

	const getStatusColor = (status: number): string => {
		if (status >= 400) {
			return RED_COLOR;
		} else {
			return GREEN_COLOR;
		}
	};

	export const logRequest = (method: string, endpoint: string, data: any) => {
		console.log('%c%s %s%o', `color:${getMethodColor(method)}`, method, endpoint, data);
	};

	export const logResponse = (status: number, endpoint: string, body: any) => {
		console.log('%c%s %c%s%o', `color:${getStatusColor(status)}`, status, `color:${GREY_COLOR}`, endpoint, body);
	};
}

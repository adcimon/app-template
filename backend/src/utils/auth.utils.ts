import * as uuid from 'uuid';

export namespace AuthUtils {
	export const generateId = (): string => {
		const id: string = uuid.v4();
		return id;
	};
}

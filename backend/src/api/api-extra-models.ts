export namespace ApiExtraModels {
	export const models: Function[] = [];

	export function register(model: Function): void {
		models.push(model);
	}
}

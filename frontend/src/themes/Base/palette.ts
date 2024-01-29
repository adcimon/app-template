import { error, info, neutral, primary, secondary, success, warning } from './colors';

export function createPalette() {
	return {
		error,
		info,
		mode: 'light',
		neutral,
		primary,
		secondary,
		success,
		warning,
	};
}

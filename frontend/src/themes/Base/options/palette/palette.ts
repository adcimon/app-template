import { background } from './background';
import { error, info, neutral, primary, secondary, success, warning } from './colors';
import { text } from './text';

export function createPalette() {
	return {
		background,
		error,
		info,
		mode: 'light',
		neutral,
		primary,
		secondary,
		success,
		text,
		warning,
	};
}

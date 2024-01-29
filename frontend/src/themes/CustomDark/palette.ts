import { alpha } from '@mui/material/styles';
import { action } from './action';
import { background } from './background';
import { error, info, neutral, primary, secondary, success, warning } from './colors';
import { text } from './text';

export function createPalette() {
	return {
		action,
		background,
		divider: alpha('#919eab', 0.2),
		error,
		info,
		mode: 'dark',
		neutral,
		primary,
		secondary,
		success,
		text,
		warning,
	};
}

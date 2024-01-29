import { alpha } from '@mui/material/styles';
import { neutral } from './colors';

export const action = {
	active: neutral.light,
	disabled: alpha(neutral.light, 0.38),
	disabledBackground: alpha(neutral.light, 0.12),
	focus: alpha(neutral.light, 0.16),
	hover: alpha(neutral.light, 0.04),
	selected: alpha(neutral.light, 0.12),
};

import { alpha } from '@mui/material/styles';
import { neutral } from './colors';

export const action = {
	active: neutral.main,
	disabled: alpha(neutral.dark, 0.38),
	disabledBackground: alpha(neutral.dark, 0.12),
	focus: alpha(neutral.dark, 0.16),
	hover: alpha(neutral.dark, 0.08),
	selected: alpha(neutral.dark, 0.12),
};

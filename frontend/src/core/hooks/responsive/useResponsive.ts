import { Theme, useTheme, useMediaQuery } from '@mui/material';
import { Breakpoint } from './breakpoint';

export function useResponsive(breakpoint: Breakpoint = 'md') {
	const theme: Theme = useTheme();
	const matches: boolean = useMediaQuery(theme.breakpoints.down(breakpoint));
	return matches;
}

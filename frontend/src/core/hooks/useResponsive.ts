import { Theme, useTheme, Breakpoint, useMediaQuery } from '@mui/material';

export function useResponsive(breakpoint: Breakpoint = 'md') {
	const theme: Theme = useTheme();
	const matches: boolean = useMediaQuery(theme.breakpoints.down(breakpoint));
	return matches;
}

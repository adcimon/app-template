import { useTheme, useMediaQuery, Theme } from '@mui/material';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function useBreakpoint(): Breakpoint {
	const theme: Theme = useTheme();

	const isXs: boolean = useMediaQuery(theme.breakpoints.only('xs'));
	const isSm: boolean = useMediaQuery(theme.breakpoints.only('sm'));
	const isMd: boolean = useMediaQuery(theme.breakpoints.only('md'));
	const isLg: boolean = useMediaQuery(theme.breakpoints.only('lg'));
	const isXl: boolean = useMediaQuery(theme.breakpoints.only('xl'));

	if (isXl) {
		return 'xl';
	}

	if (isLg) {
		return 'lg';
	}

	if (isMd) {
		return 'md';
	}

	if (isSm) {
		return 'sm';
	}

	if (isXs) {
		return 'xs';
	}

	return 'xs';
}

export function useBreakpointDown(breakpoint: Breakpoint = 'md') {
	const theme: Theme = useTheme();
	const matches: boolean = useMediaQuery(theme.breakpoints.down(breakpoint));
	return matches;
}

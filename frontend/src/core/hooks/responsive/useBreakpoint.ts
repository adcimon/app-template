import { useTheme, useMediaQuery, Theme } from '@mui/material';
import { Breakpoint } from './breakpoint';

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

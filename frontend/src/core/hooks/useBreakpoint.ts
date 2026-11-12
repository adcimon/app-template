import { useTheme, Theme } from '@mui/material';
import { useMediaQuery } from './useMediaQuery';

export enum Breakpoint {
	Xs = 'xs',
	Sm = 'sm',
	Md = 'md',
	Lg = 'lg',
	Xl = 'xl',
}

export function useBreakpoint(): Breakpoint {
	const theme: Theme = useTheme();

	const isXs: boolean = useMediaQuery(theme.breakpoints.only(Breakpoint.Xs));
	const isSm: boolean = useMediaQuery(theme.breakpoints.only(Breakpoint.Sm));
	const isMd: boolean = useMediaQuery(theme.breakpoints.only(Breakpoint.Md));
	const isLg: boolean = useMediaQuery(theme.breakpoints.only(Breakpoint.Lg));
	const isXl: boolean = useMediaQuery(theme.breakpoints.only(Breakpoint.Xl));

	if (isXl) {
		return Breakpoint.Xl;
	}

	if (isLg) {
		return Breakpoint.Lg;
	}

	if (isMd) {
		return Breakpoint.Md;
	}

	if (isSm) {
		return Breakpoint.Sm;
	}

	if (isXs) {
		return Breakpoint.Xs;
	}

	return Breakpoint.Xs;
}

export function useBreakpointDown(breakpoint: Breakpoint = Breakpoint.Md) {
	const theme: Theme = useTheme();
	const matches: boolean = useMediaQuery(theme.breakpoints.down(breakpoint));
	return matches;
}

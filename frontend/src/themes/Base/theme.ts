import { Theme, createTheme } from '@mui/material/styles';
import { createBreakpoints } from './breakpoints';
import { createPalette } from './palette';

const newTheme = () => {
	const breakpoints: any = createBreakpoints();
	const palette: any = createPalette();

	return createTheme({
		breakpoints,
		palette,
	});
};

const theme: Theme = newTheme();

export default theme;

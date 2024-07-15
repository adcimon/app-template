import { Theme, createTheme } from '@mui/material/styles';
import { createBreakpoints } from './breakpoints';
import { createComponents } from './components';
import { createPalette } from './palette';

const newTheme = () => {
	const breakpoints: any = createBreakpoints();
	const palette: any = createPalette();
	const components: any = createComponents();

	return createTheme({
		breakpoints,
		components,
		palette,
	});
};

const theme: Theme = newTheme();

export default theme;

import { Theme, createTheme } from '@mui/material';
import { createBreakpoints } from './breakpoints';
import { createComponents } from './components';
import { createPalette } from './palette';
import { createShape } from './shape';
import { createShadows } from './shadows';
import { createTypography } from './typography';

const newTheme = () => {
	const breakpoints: any = createBreakpoints();
	const palette: any = createPalette();
	const shape: any = createShape();
	const components: any = createComponents({ palette });
	const shadows: any = createShadows();
	const typography: any = createTypography();

	return createTheme({
		breakpoints,
		components,
		palette,
		shape,
		shadows,
		typography,
	});
};

const theme: Theme = newTheme();

export default theme;

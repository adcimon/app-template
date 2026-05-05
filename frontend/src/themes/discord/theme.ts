import { Theme, createTheme } from '@mui/material';
import { createBreakpoints } from './options/breakpoints';
import { createComponents } from './options/components';
import { createPalette } from './options/palette/palette';
import { createShape } from './options/shape';
import { createShadows } from './options/shadows';
import { createTypography } from './options/typography';

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

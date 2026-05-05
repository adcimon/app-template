// https://mui.com/material-ui/customization/default-theme/

import { Theme, createTheme } from '@mui/material/styles';
import { createBreakpoints } from './options/breakpoints';
import { createComponents } from './options/components';
import { createPalette } from './options/palette/palette';

const newTheme = () => {
	const breakpoints: any = createBreakpoints();
	const palette: any = createPalette();
	const components: any = createComponents({ palette });

	return createTheme({
		breakpoints,
		components,
		palette,
	});
};

const theme: Theme = newTheme();

export default theme;

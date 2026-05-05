export function createComponents(config: any) {
	const { palette } = config;

	// Autofill inputs is a browser feature that highlights inputs with a default color.
	// https://github.com/mui/material-ui/issues/33519
	const autofillStyle = {
		transition: 'background-color 600000s 0s, color 600000s 0s',
		'-webkit-box-shadow': `0 0 0 30px ${palette.background.paper} inset !important`,
		'-webkit-text-fill-color': `${palette.text.primary} !important`,
	};

	return {
		MuiAccordion: {
			styleOverrides: {
				root: {
					'&:before': {
						display: 'none',
					},
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
					scrollbarWidth: 'thin',
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					overscrollBehavior: 'contain',
					width: '100%',
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					overscrollBehavior: 'contain',
					width: '100%',
				},
				'input:-webkit-autofill': autofillStyle,
				'input:-webkit-autofill:hover': autofillStyle,
				'input:-webkit-autofill:focus': autofillStyle,
				'input:-webkit-autofill:active': autofillStyle,
			},
		},
	};
}

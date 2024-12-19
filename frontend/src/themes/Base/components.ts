export function createComponents() {
	return {
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
			},
		},
	};
}

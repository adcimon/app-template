import * as React from 'react';
import { Theme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Base from '../../themes/base/theme';
import CustomLight from '../../themes/customLight/theme';
import CustomDark from '../../themes/customDark/theme';
import { useAppState } from '../../states/hooks/useAppState';

interface IThemeManagerProps {
	children?: React.ReactNode;
}

export const ThemeManager: React.FC<IThemeManagerProps> = (props: IThemeManagerProps): JSX.Element => {
	const appState = useAppState();

	const getTheme = (): Theme => {
		switch (appState.theme) {
			case 0:
				return Base;
			case 1:
				return CustomLight;
			case 2:
				return CustomDark;
			default:
				return Base;
		}
	};

	const render = () => {
		return (
			<>
				<ThemeProvider theme={getTheme()}>
					<CssBaseline />
					{props.children}
				</ThemeProvider>
			</>
		);
	};

	return render();
};

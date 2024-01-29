import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Base from '../../themes/Base/theme';
import CustomLight from '../../themes/CustomLight/theme';
import CustomDark from '../../themes/CustomDark/theme';
import { AppStateType } from '../../states/AppState';

interface IThemeManagerProps {
	children?: React.ReactNode;
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

export const ThemeManager: React.FC<IThemeManagerProps> = (props: IThemeManagerProps): JSX.Element => {
	const getTheme = () => {
		switch (props.appState.theme) {
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

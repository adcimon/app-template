import React from 'react';
import { useRecoilState } from 'recoil';
import { ThemeManager } from './ThemeManager';
import { AppState } from '../../states/AppState';

export const ThemeManagerContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<ThemeManager
			{...props}
			appState={appState}
		/>
	);
};

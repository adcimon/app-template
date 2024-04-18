import React from 'react';
import { useRecoilState } from 'recoil';
import { MainView } from './MainView';
import { AppState } from '../../states/AppState';

export const MainViewContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<MainView
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

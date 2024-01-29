import React from 'react';
import { useRecoilState } from 'recoil';
import { AppView } from './AppView';
import { AppState } from '../../states/AppState';

export const AppViewContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<AppView
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

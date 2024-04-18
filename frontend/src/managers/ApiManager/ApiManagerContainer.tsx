import React from 'react';
import { useRecoilState } from 'recoil';
import { ApiManager } from './ApiManager';
import { AppState } from '../../states/AppState';

export const ApiManagerContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<ApiManager
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

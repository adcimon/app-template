import React from 'react';
import { useRecoilState } from 'recoil';
import { BackendManager } from './BackendManager';
import { AppState } from '../../states/AppState';

export const BackendManagerContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<BackendManager
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

import React from 'react';
import { useRecoilState } from 'recoil';
import { ForgotPasswordView } from './ForgotPasswordView';
import { AppState } from '../../states/AppState';

export const ForgotPasswordViewContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<ForgotPasswordView
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

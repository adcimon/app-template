import React from 'react';
import { useRecoilState } from 'recoil';
import { SignUpView } from './SignUpView';
import { AppState } from '../../states/AppState';

export const SignUpViewContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<SignUpView
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

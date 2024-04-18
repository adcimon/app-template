import React from 'react';
import { useRecoilState } from 'recoil';
import { SignInView } from './SignInView';
import { AppState } from '../../states/AppState';

export const SignInViewContainer: React.FC<any> = (props: any = {}): JSX.Element => {
	const [appState, setAppState] = useRecoilState(AppState);
	return (
		<SignInView
			{...props}
			appState={appState}
			setAppState={setAppState}
		/>
	);
};

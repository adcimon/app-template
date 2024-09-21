import * as React from 'react';
import { ErrorView } from '../ErrorView/ErrorView';
import { ForgotPasswordView } from '../ForgotPasswordView/ForgotPasswordView';
import { MainView } from '../MainView/MainView';
import { SignInView } from '../SignInView/SignInView';
import { SignUpView } from '../SignUpView/SignUpView';
import { useAppState } from '../../states/hooks/useAppState';
import { useUserState } from '../../states/hooks/useUserState';
import { AuthMode } from '../../types/authMode';
import { ViewType } from '../../types/viewType';

export const AppView: React.FC = (): JSX.Element => {
	const appState = useAppState();
	const userState = useUserState();

	React.useEffect(() => {
		if (!appState.error) {
			autoAuth();
		}
	}, []);

	const autoAuth = async () => {
		try {
			await userState.get();
			appState.setAppView(ViewType.Main);
			appState.setAuthMode(AuthMode.Signed);
		} catch (error: any) {
			// Ignore errors.
		}
	};

	const render = () => {
		if (appState.error) {
			return <ErrorView error={appState.error} />;
		}

		switch (appState.appView) {
			case ViewType.SignIn:
				return <SignInView />;
			case ViewType.SignUp:
				return <SignUpView />;
			case ViewType.ForgotPassword:
				return <ForgotPasswordView />;
			case ViewType.Main:
				return <MainView />;
			default:
				return <ErrorView />;
		}
	};

	return render();
};

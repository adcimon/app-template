import * as React from 'react';
import { ErrorView } from '../ErrorView/ErrorView';
import { ForgotPasswordView } from '../ForgotPasswordView/ForgotPasswordView';
import { MainView } from '../MainView/MainView';
import { SignInView } from '../SignInView/SignInView';
import { SignUpView } from '../SignUpView/SignUpView';
import { AppViewType } from '../../states/AppState';
import { useAppState } from '../../hooks/useAppState';

export const AppView: React.FC = (): JSX.Element => {
	const { appState, setAppState } = useAppState();

	React.useEffect(() => {
		if (!appState.error) {
			autoAuth();
		}
	}, []);

	const autoAuth = async () => {
		try {
			await appState.apiClient?.usersService.getMyUser();
			setAppState({
				...appState,
				appView: AppViewType.Main,
			});
		} catch (error: any) {
			// Ignore errors.
		}
	};

	const render = () => {
		if (appState.error) {
			return <ErrorView error={appState.error} />;
		}

		switch (appState.appView) {
			case AppViewType.SignIn:
				return <SignInView />;
			case AppViewType.SignUp:
				return <SignUpView />;
			case AppViewType.ForgotPassword:
				return <ForgotPasswordView />;
			case AppViewType.Main:
				return <MainView />;
			default:
				return <ErrorView />;
		}
	};

	return render();
};

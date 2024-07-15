import * as React from 'react';
import { ErrorView } from '../ErrorView/ErrorView';
import { ForgotPasswordView } from '../ForgotPasswordView/ForgotPasswordView';
import { MainView } from '../MainView/MainView';
import { SignInView } from '../SignInView/SignInView';
import { SignUpView } from '../SignUpView/SignUpView';
import { AppViewType, AppStateType } from '../../states/AppState';

interface IAppViewProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

export const AppView: React.FC<IAppViewProps> = (props: IAppViewProps): JSX.Element => {
	React.useEffect(() => {
		if (!props.appState.error) {
			autoAuth();
		}
	}, []);

	const autoAuth = async () => {
		try {
			await props.appState.apiClient?.usersService.getMyUser();
			props.setAppState({
				...props.appState,
				appView: AppViewType.Main,
			});
		} catch (error: any) {
			// Ignore errors.
		}
	};

	const render = () => {
		if (props.appState.error) {
			return <ErrorView error={props.appState.error} />;
		}

		switch (props.appState.appView) {
			case AppViewType.SignIn:
				return (
					<SignInView
						appState={props.appState}
						setAppState={props.setAppState}
					/>
				);
			case AppViewType.SignUp:
				return (
					<SignUpView
						appState={props.appState}
						setAppState={props.setAppState}
					/>
				);
			case AppViewType.ForgotPassword:
				return (
					<ForgotPasswordView
						appState={props.appState}
						setAppState={props.setAppState}
					/>
				);
			case AppViewType.Main:
				return (
					<MainView
						appState={props.appState}
						setAppState={props.setAppState}
					/>
				);
			default:
				return <ErrorView />;
		}
	};

	return render();
};

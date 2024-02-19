import * as React from 'react';
import { ErrorView } from '../ErrorView/ErrorView';
import { ForgotPasswordViewContainer } from '../ForgotPasswordView/ForgotPasswordViewContainer';
import { LaunchView } from '../LaunchView/LaunchView';
import { MainViewContainer } from '../MainView/MainViewContainer';
import { SignInViewContainer } from '../SignInView/SignInViewContainer';
import { SignUpViewContainer } from '../SignUpView/SignUpViewContainer';
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
			await props.appState.backendClient?.usersClient.getMyUser();
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
					<LaunchView>
						<SignInViewContainer />
					</LaunchView>
				);
			case AppViewType.SignUp:
				return (
					<LaunchView>
						<SignUpViewContainer />
					</LaunchView>
				);
			case AppViewType.ForgotPassword:
				return (
					<LaunchView>
						<ForgotPasswordViewContainer />
					</LaunchView>
				);
			case AppViewType.Main:
				return <MainViewContainer />;
			default:
				return <ErrorView />;
		}
	};

	return render();
};

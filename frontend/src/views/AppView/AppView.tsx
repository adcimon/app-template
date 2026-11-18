import React from 'react';
import { ErrorView } from '../../views/ErrorView/ErrorView';
import { ForgotPasswordView } from '../../views/ForgotPasswordView/ForgotPasswordView';
import { LoadingView } from '../LoadingView/LoadingView';
import { MainView } from '../../views/MainView/MainView';
import { SignInView } from '../../views/SignInView/SignInView';
import { SignUpView } from '../../views/SignUpView/SignUpView';
import { Route } from '../../core/components/Router/Route';
import { Router } from '../../core/components/Router/Router';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useUserState } from '../../states/user/useUserState';
import { AppPath } from '../../types/appPath';
import { CryptoUtils } from '../../utils/cryptoUtils';

export const AppView = (): React.JSX.Element => {
	const navigator = useNavigator();
	const userState = useUserState();

	const [initialized, setInitialized] = React.useState<boolean>(false);

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		await autoAuth();
		setInitialized(true);
	};

	const autoAuth = async () => {
		try {
			await userState.get();
			navigator.navigate(AppPath.Home, {
				params: navigator.params,
			});
		} catch {}
	};

	const render = () => {
		if (!initialized) {
			return <LoadingView />;
		}

		return (
			<Router>
				<Route path={AppPath.Home}>
					{userState.user ? (
						<MainView />
					) : !userState.user && navigator.hasParam('token') ? (
						<MainView />
					) : (
						<SignInView />
					)}
				</Route>
				<Route path={AppPath.SignIn}>
					<SignInView />
				</Route>
				<Route path={AppPath.SignUp}>
					<SignUpView />
				</Route>
				<Route path={AppPath.ForgotPassword}>
					<ForgotPasswordView />
				</Route>
				<Route path={AppPath.Error}>
					<ErrorView
						message={CryptoUtils.decodeBase64(navigator.getParam('message'))}
						onClick={() => navigator.redirect(AppPath.Home)}
					/>
				</Route>
				<Route path='*'>
					<ErrorView
						message="The page you're looking for could not be found."
						onClick={() => navigator.redirect(AppPath.Home)}
					/>
				</Route>
			</Router>
		);
	};

	return render();
};

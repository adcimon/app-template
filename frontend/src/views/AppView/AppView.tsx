import React from 'react';
import { ToastManager } from '../../managers/ToastManager/ToastManager';
import { ErrorView } from '../../views/ErrorView/ErrorView';
import { ForgotPasswordView } from '../../views/ForgotPasswordView/ForgotPasswordView';
import { LoadingView } from '../LoadingView/LoadingView';
import { MainView } from '../../views/MainView/MainView';
import { SignInView } from '../../views/SignInView/SignInView';
import { SignUpView } from '../../views/SignUpView/SignUpView';
import { Route } from '../../core/router/Route';
import { Router } from '../../core/router/Router';
import { WindowEvent, WindowEventType } from '../../core/windows/windowEvent';
import { useNavigator } from '../../core/router/useNavigator';
import { useWindowEvent } from '../../core/windows/useWindowEvent';
import { useUserState } from '../../states/user/useUserState';
import { AppPath } from '../../types/appPath';
import { CryptoUtils } from '../../utils/cryptoUtils';

export const AppView = (): React.JSX.Element => {
	const navigator = useNavigator();
	const userState = useUserState();

	const [initialized, setInitialized] = React.useState<boolean>(false);

	useWindowEvent((event: WindowEvent) => {
		if (event.type === WindowEventType.Blocked) {
			ToastManager.error('Your browser blocked the window. Allow pop-ups for this site.');
		}
	});

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

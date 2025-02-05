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
import { CryptoUtils } from '../../utils/cryptoUtils';

export const AppView: React.FC = (): JSX.Element => {
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
			navigator.navigate('/', {
				params: navigator.params,
			});
		} catch (error: any) {
			// Ignore errors.
		}
	};

	const render = () => {
		if (!initialized) {
			return <LoadingView />;
		}

		return (
			<>
				<Router>
					<Route path='/'>
						{userState.user ? (
							<MainView />
						) : !userState.user && navigator.hasParam('token') ? (
							<MainView />
						) : (
							<SignInView />
						)}
					</Route>
					<Route path='/sign-in'>
						<SignInView />
					</Route>
					<Route path='/sign-up'>
						<SignUpView />
					</Route>
					<Route path='/forgot-password'>
						<ForgotPasswordView />
					</Route>
					<Route path='/error'>
						<ErrorView
							message={CryptoUtils.decodeBase64(navigator.getParam('message'))}
							onClick={() => navigator.redirect('/')}
						/>
					</Route>
					<Route path='*'>
						<ErrorView
							message={'Page not found'}
							onClick={() => navigator.redirect('/')}
						/>
					</Route>
				</Router>
			</>
		);
	};

	return render();
};

import React from 'react';
import { Button, Divider, Link, Typography } from '@mui/material';
import { ToastManager } from '../../managers/ToastManager/ToastManager';
import { Copyright } from '../../components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { SignInForm } from '../../forms/SignInForm/SignInForm';
import { useSignInForm } from '../../forms/SignInForm/useSignInForm';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';
import { useUserState } from '../../states/user/useUserState';

export const SignInView = (): React.JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();
	const userState = useUserState();

	const form = useSignInForm();

	const handleSignIn = async () => {
		try {
			await appState.signIn(form.values);
			await userState.get();
			navigator.navigate('/');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const handleForgotPassword = () => {
		navigator.navigate('/forgot-password');
	};

	const handleSignUp = () => {
		navigator.navigate('/sign-up');
	};

	const render = () => {
		return (
			<LaunchView>
				<Logo />
				<Typography variant='h5'>Sign In</Typography>
				<SignInForm
					values={form.values}
					onChange={form.handleChange}
				/>
				<Link
					component='button'
					variant='body2'
					underline='hover'
					onClick={handleForgotPassword}
					sx={{
						alignSelf: 'flex-end',
						fontWeight: 500,
						marginTop: '-0.5rem',
					}}>
					Forgot password?
				</Link>
				<Button
					variant='contained'
					onClick={handleSignIn}
					fullWidth={true}>
					Sign In
				</Button>
				<Divider
					sx={{
						color: 'text.secondary',
						typography: 'body2',
						width: '100%',
					}}>
					or
				</Divider>
				<Button
					variant='outlined'
					onClick={handleSignUp}
					fullWidth={true}>
					Sign Up
				</Button>
				<Copyright />
			</LaunchView>
		);
	};

	return render();
};

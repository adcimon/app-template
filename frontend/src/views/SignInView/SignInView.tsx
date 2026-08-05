import React from 'react';
import { Button, Link, Stack, Typography } from '@mui/material';
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

	const { form, handleChange } = useSignInForm();

	const handleSignIn = async () => {
		try {
			await appState.signIn(form);
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
					form={form}
					onChange={handleChange}
				/>
				<Button
					variant='contained'
					onClick={handleSignIn}
					fullWidth={true}>
					Sign In
				</Button>
				<Stack
					direction='row'
					sx={{
						justifyContent: 'space-between',
						width: '100%',
					}}>
					<Link
						component='button'
						variant='body2'
						onClick={handleForgotPassword}>
						Forgot your password?
					</Link>
					<Link
						component='button'
						variant='body2'
						onClick={handleSignUp}>
						Don't have an account? Sign Up
					</Link>
				</Stack>
				<Copyright />
			</LaunchView>
		);
	};

	return render();
};

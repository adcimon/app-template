import React from 'react';
import { Link, Stack, Typography } from '@mui/material';
import { ToastManager } from '../../managers/ToastManager/ToastManager';
import { Copyright } from '../../components/Copyright/Copyright';
import { ForgotPasswordForm } from '../../forms/ForgotPasswordForm/ForgotPasswordForm';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { useForgotPasswordForm } from '../../forms/ForgotPasswordForm/useForgotPasswordForm';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';

export const ForgotPasswordView = (): React.JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();

	const { form, validateSendCode, validateChange, handleChange } = useForgotPasswordForm();

	const handleSendCode = async () => {
		try {
			await appState.forgotPassword(form);
			ToastManager.success('Code sent');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const handleConfirm = async () => {
		try {
			await appState.confirmPassword(form);
			navigator.navigate('/sign-in');
			ToastManager.success('Password changed');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const handleSignIn = () => {
		navigator.navigate('/sign-in');
	};

	const render = () => {
		return (
			<LaunchView>
				<Logo />
				<Typography variant='h5'>Forgot Password</Typography>
				<ForgotPasswordForm
					form={form}
					sendDisabled={!validateSendCode()}
					confirmDisabled={!validateChange()}
					onChange={handleChange}
					onSendCode={handleSendCode}
					onConfirm={handleConfirm}
				/>
				<Stack
					direction='row'
					sx={{
						width: '100%',
					}}>
					<Link
						component='button'
						variant='body2'
						onClick={handleSignIn}>
						← Already have an account? Sign in
					</Link>
				</Stack>
				<Copyright />
			</LaunchView>
		);
	};

	return render();
};

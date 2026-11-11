import React from 'react';
import { Button, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

	const form = useForgotPasswordForm();

	const handleSendCode = async () => {
		try {
			await appState.forgotPassword(form.values);
			ToastManager.success('Code sent');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const handleConfirm = async () => {
		try {
			await appState.confirmPassword(form.values);
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
					values={form.values}
					sendDisabled={!form.validateSendCode()}
					confirmDisabled={!form.validateChange()}
					onChange={form.handleChange}
					onSendCode={handleSendCode}
					onConfirm={handleConfirm}
				/>
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
					startIcon={<ArrowBackIcon />}
					onClick={handleSignIn}
					fullWidth={true}>
					Back to Sign In
				</Button>
				<Copyright />
			</LaunchView>
		);
	};

	return render();
};

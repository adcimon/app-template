import React from 'react';
import { Button, Link, Stack, Typography } from '@mui/material';
import { ToastManager } from '../../managers/ToastManager/ToastManager';
import { Copyright } from '../../components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { PrivacyPolicyDialog } from '../../components/Dialog/PrivacyPolicyDialog';
import { SignUpForm } from '../../forms/SignUpForm/SignUpForm';
import { TermsOfServiceDialog } from '../../components/Dialog/TermsOfServiceDialog';
import { useSignUpForm } from '../../forms/SignUpForm/useSignUpForm';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';

export const SignUpView = (): React.JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();

	const form = useSignUpForm();

	const [openTermsOfServiceDialog, setOpenTermsOfServiceDialog] = React.useState<boolean>(false);
	const [openPrivacyPolicyDialog, setOpenPrivacyPolicyDialog] = React.useState<boolean>(false);

	const handleOpenTermsOfService = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setOpenTermsOfServiceDialog(true);
	};

	const handleAcceptTermsOfService = () => {
		setOpenTermsOfServiceDialog(false);
	};

	const handleOpenPrivacyPolicy = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setOpenPrivacyPolicyDialog(true);
	};

	const handleAcceptPrivacyPolicy = () => {
		setOpenPrivacyPolicyDialog(false);
	};

	const handleSignUp = async () => {
		try {
			await appState.signUp(form.values);
			navigator.navigate('/sign-in');
			ToastManager.success('Verify your email');
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
				<Typography variant='h5'>Sign Up</Typography>
				<SignUpForm
					values={form.values}
					onChange={form.handleChange}
					onOpenTermsOfService={handleOpenTermsOfService}
					onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
				/>
				<Button
					disabled={!form.validate()}
					variant='contained'
					onClick={handleSignUp}
					fullWidth={true}>
					Sign Up
				</Button>
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
				<TermsOfServiceDialog
					open={openTermsOfServiceDialog}
					onClose={handleAcceptTermsOfService}
				/>
				<PrivacyPolicyDialog
					open={openPrivacyPolicyDialog}
					onClose={handleAcceptPrivacyPolicy}
				/>
			</LaunchView>
		);
	};

	return render();
};

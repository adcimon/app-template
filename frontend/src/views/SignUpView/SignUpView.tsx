import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ToastManager } from '../../managers/ToastManager/ToastManager';
import { Copyright } from '../../components/Copyright/Copyright';
import { EmailField } from '../../core/components/Field/EmailField';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { PrivacyPolicyDialog } from '../../core/components/Dialog/PrivacyPolicyDialog';
import { TermsOfServiceDialog } from '../../core/components/Dialog/TermsOfServiceDialog';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';
import { AppUtils } from '../../utils/appUtils';

export const SignUpView = (): JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [legalAccepted, setLegalAccepted] = React.useState<boolean>(false);
	const [openTermsOfServiceDialog, setOpenTermsOfServiceDialog] = React.useState<boolean>(false);
	const [openPrivacyPolicyDialog, setOpenPrivacyPolicyDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(email) && password !== '' && password === confirmPassword && legalAccepted;
	};

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
			await appState.signUp(email, password);
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
				<EmailField
					label='Email'
					value={email}
					required={true}
					onChange={(event: any) => setEmail(event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Password'
					value={password}
					required={true}
					onChange={(event: any) => setPassword(event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Confirm Password'
					value={confirmPassword}
					required={true}
					onChange={(event: any) => setConfirmPassword(event.target.value)}
					fullWidth={true}
				/>
				<FormControlLabel
					control={
						<Checkbox
							color='primary'
							value={legalAccepted}
							onChange={(event: any, checked: boolean) => setLegalAccepted(checked)}
						/>
					}
					label={
						<Typography variant='subtitle2'>
							I have read and agree to the{' '}
							<Link onClick={handleOpenTermsOfService}>Terms of Service</Link> and{' '}
							<Link onClick={handleOpenPrivacyPolicy}>Privacy Policy</Link>.
						</Typography>
					}
				/>
				<Button
					disabled={!validate()}
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

import React from 'react';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../../components/Logo/Logo';
import { PasswordField } from '../../components/Field/PasswordField';
import { PrivacyPolicyDialog } from '../../components/Dialog/PrivacyPolicyDialog';
import { TermsOfServiceDialog } from '../../components/Dialog/TermsOfServiceDialog';
import { useAppState } from '../../states/hooks/useAppState';
import { ViewType } from '../../types/viewType';
import { Utils } from '../../utils/utils';

export const SignUpView: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [legalAccepted, setLegalAccepted] = React.useState<boolean>(false);
	const [openTermsOfServiceDialog, setOpenTermsOfServiceDialog] = React.useState<boolean>(false);
	const [openPrivacyPolicyDialog, setOpenPrivacyPolicyDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return Utils.EMAIL_REGEXP.test(email) && password !== '' && password === confirmPassword && legalAccepted;
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
			appState.setAppView(ViewType.SignIn);
			toast.success('Verify your email');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleSignIn = () => {
		appState.setAppView(ViewType.SignIn);
	};

	const render = () => {
		return (
			<>
				<LaunchView>
					<Logo />
					<Typography
						component='h1'
						variant='h5'>
						Sign Up
					</Typography>
					<TextField
						label='Email'
						value={email}
						required={true}
						onChange={(event: any) => setEmail(event.target.value)}
						fullWidth={true}
						margin='normal'
					/>
					<PasswordField
						label='Password'
						value={password}
						required={true}
						onChange={(event: any) => setPassword(event.target.value)}
						fullWidth={true}
						margin='normal'
					/>
					<PasswordField
						label='Confirm Password'
						value={confirmPassword}
						required={true}
						onChange={(event: any) => setConfirmPassword(event.target.value)}
						fullWidth={true}
						margin='normal'
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
							<>
								<Typography variant='subtitle2'>
									I have read and agree to the{' '}
									<Link onClick={handleOpenTermsOfService}>Terms of Service</Link> and{' '}
									<Link onClick={handleOpenPrivacyPolicy}>Privacy Policy</Link>.
								</Typography>
							</>
						}
					/>
					<Button
						disabled={!validate()}
						variant='contained'
						onClick={handleSignUp}
						fullWidth={true}
						sx={{
							marginBottom: 2,
							marginTop: 3,
						}}>
						Sign Up
					</Button>
					<Grid
						container
						sx={{
							marginBottom: '25px',
						}}>
						<Grid item>
							<Link
								href='#'
								variant='body2'
								onClick={handleSignIn}>
								← Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
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
			</>
		);
	};

	return render();
};

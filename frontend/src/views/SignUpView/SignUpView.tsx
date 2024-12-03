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

interface ISignUpViewState {
	openTermsOfServiceDialog: boolean;
	openPrivacyPolicyDialog: boolean;
	email: string;
	password: string;
	confirmPassword: string;
	legalAccepted: boolean;
}

export const SignUpView: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [state, setState] = React.useState<ISignUpViewState>({
		openTermsOfServiceDialog: false,
		openPrivacyPolicyDialog: false,
		email: '',
		password: '',
		confirmPassword: '',
		legalAccepted: false,
	});

	const validate = (): boolean => {
		return (
			Utils.EMAIL_REGEXP.test(state.email) &&
			state.password !== '' &&
			state.password === state.confirmPassword &&
			state.legalAccepted
		);
	};

	const handleOpenTermsOfService = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setState({
			...state,
			openTermsOfServiceDialog: true,
		});
	};

	const handleAcceptTermsOfService = () => {
		setState({
			...state,
			openTermsOfServiceDialog: false,
		});
	};

	const handleOpenPrivacyPolicy = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setState({
			...state,
			openPrivacyPolicyDialog: true,
		});
	};

	const handleAcceptPrivacyPolicy = () => {
		setState({
			...state,
			openPrivacyPolicyDialog: false,
		});
	};

	const handleSignUp = async () => {
		try {
			await appState.signUp(state.email, state.password);
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
						value={state.email}
						onChange={(event: any) => setState({ ...state, email: event.target.value })}
						required
						fullWidth
						margin='normal'
					/>
					<PasswordField
						label='Password'
						value={state.password}
						onChange={(event: any) => setState({ ...state, password: event.target.value })}
						required
						fullWidth
						margin='normal'
					/>
					<PasswordField
						label='Confirm Password'
						value={state.confirmPassword}
						onChange={(event: any) => setState({ ...state, confirmPassword: event.target.value })}
						required
						fullWidth
						margin='normal'
					/>
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								value={state.legalAccepted}
								onChange={(event: any, checked: boolean) =>
									setState({
										...state,
										legalAccepted: checked,
									})
								}
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
						fullWidth
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
						open={state.openTermsOfServiceDialog}
						onClose={handleAcceptTermsOfService}
					/>
					<PrivacyPolicyDialog
						open={state.openPrivacyPolicyDialog}
						onClose={handleAcceptPrivacyPolicy}
					/>
				</LaunchView>
			</>
		);
	};

	return render();
};

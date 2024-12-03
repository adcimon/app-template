import React from 'react';
import toast from 'react-hot-toast';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../../components/Logo/Logo';
import { PasswordField } from '../../components/Field/PasswordField';
import { useAppState } from '../../states/hooks/useAppState';
import { ViewType } from '../../types/viewType';
import { Utils } from '../../utils/utils';

interface IForgotPasswordViewState {
	email: string;
	code: string;
	password: string;
	confirmPassword: string;
}

export const ForgotPasswordView: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [state, setState] = React.useState<IForgotPasswordViewState>({
		email: '',
		code: '',
		password: '',
		confirmPassword: '',
	});

	const validateSendCode = (): boolean => {
		return Utils.EMAIL_REGEXP.test(state.email);
	};

	const validateChange = (): boolean => {
		return (
			Utils.EMAIL_REGEXP.test(state.email) &&
			state.code !== '' &&
			state.password !== '' &&
			state.password === state.confirmPassword
		);
	};

	const handleSendCode = async () => {
		try {
			await appState.forgotPassword(state.email);
			toast.success('Code sent');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleChange = async () => {
		try {
			await appState.changePassword(state.email, state.code, state.password);
			appState.setAppView(ViewType.SignIn);
			toast.success('Password changed');
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
						Forgot Password
					</Typography>
					<TextField
						label='Email'
						value={state.email}
						onChange={(event: any) => setState({ ...state, email: event.target.value })}
						required
						fullWidth
						margin='normal'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<Badge
										badgeContent={1}
										color='primary'>
										<Button
											disabled={!validateSendCode()}
											variant='contained'
											size='small'
											onClick={handleSendCode}
											fullWidth>
											Send Code
										</Button>
									</Badge>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						label='Code'
						placeholder='Code sent to your email'
						value={state.code}
						onChange={(event: any) => setState({ ...state, code: event.target.value })}
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
					<Badge
						badgeContent={2}
						color='primary'
						sx={{
							marginTop: 2,
							width: '100%',
						}}>
						<Button
							disabled={!validateChange()}
							variant='contained'
							onClick={handleChange}
							fullWidth>
							Change
						</Button>
					</Badge>
					<Grid
						container
						sx={{
							marginBottom: '25px',
							marginTop: 2,
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
				</LaunchView>
			</>
		);
	};

	return render();
};

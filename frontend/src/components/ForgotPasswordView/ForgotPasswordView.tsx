import * as React from 'react';
import toast from 'react-hot-toast';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../Copyright/Copyright';
import { Logo } from '../Logo/Logo';
import { PasswordField } from '../Field/PasswordField';
import { AppViewType, AppStateType } from '../../states/AppState';
import { Utils } from '../../utils/utils';

interface IForgotPasswordViewProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface IForgotPasswordViewState {
	email: string;
	code: string;
	password: string;
	confirmPassword: string;
}

export const ForgotPasswordView: React.FC<IForgotPasswordViewProps> = (
	props: IForgotPasswordViewProps,
): JSX.Element => {
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
			await props.appState.apiClient?.authClient.forgotPassword(state.email);
			toast.success('Code sent');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleChange = async () => {
		try {
			await props.appState.apiClient?.authClient.changePassword(state.email, state.code, state.password);
			props.setAppState({
				...props.appState,
				appView: AppViewType.SignIn,
			});
			toast.success('Password changed');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleSignIn = () => {
		props.setAppState({
			...props.appState,
			appView: AppViewType.SignIn,
		});
	};

	const render = () => {
		return (
			<>
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
										onClick={handleSendCode}
										fullWidth
										size='small'
										variant='contained'>
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
						onClick={handleChange}
						fullWidth
						variant='contained'>
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
							onClick={handleSignIn}
							variant='body2'>
							← Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
				<Copyright />
			</>
		);
	};

	return render();
};

import * as React from 'react';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../../components/Logo/Logo';
import { PasswordField } from '../../components/Field/PasswordField';
import { AppViewType, AppStateType } from '../../states/AppState';

interface ISignInViewProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface ISignInViewState {
	email: string;
	password: string;
}

export const SignInView: React.FC<ISignInViewProps> = (props: ISignInViewProps): JSX.Element => {
	const [state, setState] = React.useState<ISignInViewState>({
		email: '',
		password: '',
	});

	const handleSignIn = async () => {
		try {
			await props.appState.apiClient?.authService.signIn(state.email, state.password);
			props.setAppState({
				...props.appState,
				appView: AppViewType.Main,
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleForgotPassword = () => {
		props.setAppState({
			...props.appState,
			appView: AppViewType.ForgotPassword,
		});
	};

	const handleSignUp = () => {
		props.setAppState({
			...props.appState,
			appView: AppViewType.SignUp,
		});
	};

	const render = () => {
		return (
			<>
				<LaunchView>
					<Logo />
					<Typography
						component='h1'
						variant='h5'>
						Sign In
					</Typography>
					<TextField
						label='Email'
						autoComplete='email'
						value={state.email}
						onChange={(event: any) => setState({ ...state, email: event.target.value })}
						autoFocus
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
					<Button
						onClick={handleSignIn}
						fullWidth
						variant='contained'
						sx={{
							marginBottom: 2,
							marginTop: 3,
						}}>
						Sign In
					</Button>
					<Grid
						container
						sx={{ marginBottom: '25px' }}>
						<Grid
							item
							xs>
							<Link
								href='#'
								onClick={handleForgotPassword}
								variant='body2'>
								Forgot your password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								href='#'
								onClick={handleSignUp}
								variant='body2'>
								{"Don't have an account? Sign Up"}
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

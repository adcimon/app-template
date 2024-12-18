import React from 'react';
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
import { useAppState } from '../../states/hooks/useAppState';
import { AuthMode } from '../../types/authMode';
import { ViewType } from '../../types/viewType';

export const SignInView: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleSignIn = async () => {
		try {
			await appState.signIn(email, password);
			appState.setAppView(ViewType.Main);
			appState.setAuthMode(AuthMode.Signed);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleForgotPassword = () => {
		appState.setAppView(ViewType.ForgotPassword);
	};

	const handleSignUp = () => {
		appState.setAppView(ViewType.SignUp);
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
						value={email}
						autoFocus={true}
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
					<Button
						variant='contained'
						onClick={handleSignIn}
						fullWidth={true}
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
								variant='body2'
								onClick={handleForgotPassword}>
								Forgot your password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								href='#'
								variant='body2'
								onClick={handleSignUp}>
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

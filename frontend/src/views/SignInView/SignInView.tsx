import React from 'react';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../core/components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../../components/Logo/Logo';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';
import { useUserState } from '../../states/user/useUserState';

export const SignInView: React.FC = (): JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();
	const userState = useUserState();

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleSignIn = async () => {
		try {
			await appState.signIn(email, password);
			await userState.get();
			navigator.navigate('/');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleForgotPassword = () => {
		navigator.navigate('/forgot-password');
	};

	const handleSignUp = () => {
		navigator.navigate('/sign-up');
	};

	const render = () => {
		return (
			<>
				<LaunchView>
					<Logo />
					<Typography variant='h5'>Sign In</Typography>
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
								component='button'
								variant='body2'
								onClick={handleForgotPassword}>
								Forgot your password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								component='button'
								variant='body2'
								onClick={handleSignUp}>
								Don't have an account? Sign Up
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

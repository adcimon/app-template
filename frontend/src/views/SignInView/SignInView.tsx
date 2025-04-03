import React from 'react';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../core/components/Copyright/Copyright';
import { EmailField } from '../../core/components/Field/EmailField';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';
import { useUserState } from '../../states/user/useUserState';

export const SignInView = (): JSX.Element => {
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
					<EmailField
						label='Email'
						value={email}
						autoComplete='email'
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
					<Button
						variant='contained'
						onClick={handleSignIn}
						fullWidth={true}>
						Sign In
					</Button>
					<Stack
						direction='row'
						sx={{
							justifyContent: 'space-between',
							width: '100%',
						}}>
						<Link
							component='button'
							variant='body2'
							onClick={handleForgotPassword}>
							Forgot your password?
						</Link>
						<Link
							component='button'
							variant='body2'
							onClick={handleSignUp}>
							Don't have an account? Sign Up
						</Link>
					</Stack>
					<Copyright />
				</LaunchView>
			</>
		);
	};

	return render();
};

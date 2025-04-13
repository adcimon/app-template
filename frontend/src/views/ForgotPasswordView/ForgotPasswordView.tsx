import React from 'react';
import toast from 'react-hot-toast';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../core/components/Copyright/Copyright';
import { EmailField } from '../../core/components/Field/EmailField';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';
import { AppUtils } from '../../utils/appUtils';

export const ForgotPasswordView = (): JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();

	const [email, setEmail] = React.useState<string>('');
	const [code, setCode] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');

	const validateSendCode = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(email);
	};

	const validateChange = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(email) && code !== '' && password !== '' && password === confirmPassword;
	};

	const handleSendCode = async () => {
		try {
			await appState.forgotPassword(email);
			toast.success('Code sent');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleChange = async () => {
		try {
			await appState.confirmPassword(email, code, password);
			navigator.navigate('/sign-in');
			toast.success('Password changed');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleSignIn = () => {
		navigator.navigate('/sign-in');
	};

	const render = () => {
		return (
			<LaunchView>
				<Logo />
				<Typography variant='h5'>Forgot Password</Typography>
				<EmailField
					label='Email'
					value={email}
					required={true}
					onChange={(event: any) => setEmail(event.target.value)}
					fullWidth={true}
				/>
				<Badge
					color='primary'
					badgeContent={1}
					sx={{
						width: '100%',
					}}>
					<Button
						variant='contained'
						disabled={!validateSendCode()}
						onClick={handleSendCode}
						size='small'
						fullWidth={true}>
						Send Code
					</Button>
				</Badge>
				<TextField
					label='Code'
					placeholder='Code sent to your email'
					value={code}
					required={true}
					onChange={(event: any) => setCode(event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Password'
					value={password}
					autoComplete='new-password'
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
				<Badge
					color='primary'
					badgeContent={2}
					sx={{
						width: '100%',
					}}>
					<Button
						variant='contained'
						disabled={!validateChange()}
						onClick={handleChange}
						fullWidth={true}>
						Change
					</Button>
				</Badge>
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
			</LaunchView>
		);
	};

	return render();
};

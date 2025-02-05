import React from 'react';
import toast from 'react-hot-toast';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../core/components/Copyright/Copyright';
import { LaunchView } from '../LaunchView/LaunchView';
import { Logo } from '../LaunchView/Logo';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useAppState } from '../../states/app/useAppState';
import { AppUtils } from '../../utils/appUtils';

export const ForgotPasswordView: React.FC = (): JSX.Element => {
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
			<>
				<LaunchView>
					<Logo />
					<Typography variant='h5'>Forgot Password</Typography>
					<TextField
						label='Email'
						value={email}
						required={true}
						onChange={(event: any) => setEmail(event.target.value)}
						fullWidth={true}
						margin='normal'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<Badge
										color='primary'
										badgeContent={1}>
										<Button
											variant='contained'
											disabled={!validateSendCode()}
											onClick={handleSendCode}
											size='small'
											fullWidth={true}>
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
						value={code}
						required={true}
						onChange={(event: any) => setCode(event.target.value)}
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
					<Badge
						color='primary'
						badgeContent={2}
						sx={{
							marginTop: 2,
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
					<Grid
						container
						sx={{
							marginBottom: '25px',
							marginTop: 2,
						}}>
						<Grid item>
							<Link
								component='button'
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

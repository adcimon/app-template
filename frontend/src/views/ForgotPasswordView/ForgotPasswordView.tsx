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

export const ForgotPasswordView: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [email, setEmail] = React.useState<string>('');
	const [code, setCode] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');

	const validateSendCode = (): boolean => {
		return Utils.EMAIL_REGEXP.test(email);
	};

	const validateChange = (): boolean => {
		return Utils.EMAIL_REGEXP.test(email) && code !== '' && password !== '' && password === confirmPassword;
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
			await appState.changePassword(email, code, password);
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
						value={email}
						onChange={(event: any) => setEmail(event.target.value)}
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
						value={code}
						onChange={(event: any) => setCode(event.target.value)}
						required
						fullWidth
						margin='normal'
					/>
					<PasswordField
						label='Password'
						value={password}
						onChange={(event: any) => setPassword(event.target.value)}
						required
						fullWidth
						margin='normal'
					/>
					<PasswordField
						label='Confirm Password'
						value={confirmPassword}
						onChange={(event: any) => setConfirmPassword(event.target.value)}
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

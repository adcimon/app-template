import * as React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../../Dialog/ConfirmationDialog';
import { VerificationBadge } from '../../../../../Badge/VerificationBadge';
import { AppStateType } from '../../../../../../states/AppState';
import { Utils } from '../../../../../../utils/utils';

interface IProfileEmailCardProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface IProfileEmailCardState {
	openChangeDialog: boolean;
	openVerifyDialog: boolean;
	email: string;
	newEmail: string;
	code: string;
}

export const ProfileEmailCard: React.FC<IProfileEmailCardProps> = (props: IProfileEmailCardProps): JSX.Element => {
	const [state, setState] = React.useState<IProfileEmailCardState>({
		openChangeDialog: false,
		openVerifyDialog: false,
		email: props.appState.user.email,
		newEmail: '',
		code: '',
	});

	const validate = (): boolean => {
		return Utils.EMAIL_REGEXP.test(state.email) && state.email !== props.appState.user.email;
	};

	const handleVerify = async () => {
		setState({
			...state,
			openVerifyDialog: true,
			code: '',
		});
	};

	const handleAcceptVerify = async () => {
		try {
			await props.appState.apiClient?.authClient.verifyEmail(state.code);
			const user: any = await props.appState.apiClient?.usersClient.getMyUser();
			props.setAppState({
				...props.appState,
				user: user,
			});
			toast.success('Email changed');
		} catch (error: any) {
			toast.error(error.message);
		}

		setState({
			...state,
			openVerifyDialog: false,
		});
	};

	const handleCancelVerify = async () => {
		setState({
			...state,
			openVerifyDialog: false,
		});
	};

	const handleChange = async () => {
		setState({
			...state,
			openChangeDialog: true,
		});
	};

	const handleAcceptChange = async () => {
		try {
			await props.appState.apiClient?.usersClient.updateMyEmail(state.email);
			toast.success('Verification code sent');
		} catch (error: any) {
			toast.error(error.message);
		}

		setState({
			...state,
			openChangeDialog: false,
		});
	};

	const handleCancelChange = async () => {
		setState({
			...state,
			openChangeDialog: false,
		});
	};

	const render = () => {
		return (
			<>
				<Card>
					<CardHeader
						subheader={
							<>
								<Stack
									direction='row'
									spacing={0.5}>
									<Typography
										sx={{
											color: 'text.primary',
											display: 'inline',
											fontWeight: 'bold',
										}}>
										Email
									</Typography>
									<VerificationBadge verified={props.appState.user.emailVerified} />
								</Stack>
							</>
						}
					/>
					<CardContent
						sx={{
							paddingTop: 0,
						}}>
						<Box
							sx={{
								margin: -1.5,
								padding: 2,
							}}>
							<Grid
								container
								spacing={3}>
								<Grid
									item
									xs={12}
									md={12}
									lg={12}>
									<TextField
										label='Email'
										value={state.email}
										onChange={(event: any) => setState({ ...state, email: event.target.value })}
										InputLabelProps={{ shrink: true }}
										fullWidth
									/>
									<Typography
										variant='body2'
										sx={{
											color: 'text.secondary',
											marginTop: '15px',
										}}>
										Email change requires the email verification via a code sent to the new address.
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</CardContent>
					<Divider />
					<CardActions
						sx={{
							justifyContent: 'flex-end',
						}}>
						<Button
							onClick={handleVerify}
							variant='contained'>
							Verify
						</Button>
						<Button
							disabled={!validate()}
							onClick={handleChange}
							variant='contained'>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					open={state.openChangeDialog}
					title='Change Email'
					acceptable={state.email === state.newEmail}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<Typography>Confirm your new email to change it.</Typography>
					<TextField
						value={state.newEmail}
						onChange={(event: any) => setState({ ...state, newEmail: event.target.value })}
						autoFocus
						fullWidth
						margin='dense'
						variant='standard'
					/>
				</ConfirmationDialog>
				<ConfirmationDialog
					open={state.openVerifyDialog}
					title='Verify Email'
					acceptable={state.code !== ''}
					onAccept={handleAcceptVerify}
					onCancel={handleCancelVerify}
					onClose={handleCancelVerify}>
					<Typography>Insert the verification code to change your email.</Typography>
					<TextField
						type='number'
						value={state.code}
						onChange={(event: any) => setState({ ...state, code: event.target.value })}
						autoFocus
						fullWidth
						margin='dense'
						variant='standard'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

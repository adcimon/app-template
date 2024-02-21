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
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../../Dialog/ConfirmationDialog';
import { PasswordField } from '../../../../../Field/PasswordField';
import { AppStateType } from '../../../../../../states/AppState';

interface IProfilePasswordCardProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface IProfilePasswordCardState {
	openDialog: boolean;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export const ProfilePasswordCard: React.FC<IProfilePasswordCardProps> = (
	props: IProfilePasswordCardProps,
): JSX.Element => {
	const [state, setState] = React.useState<IProfilePasswordCardState>({
		openDialog: false,
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const validate = (): boolean => {
		return (
			state.newPassword !== '' &&
			state.currentPassword !== state.newPassword &&
			state.newPassword === state.confirmPassword
		);
	};

	const handleChange = async () => {
		setState({
			...state,
			openDialog: true,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		});
	};

	const handleAcceptChange = async () => {
		try {
			await props.appState.backendClient?.usersClient.updateMyPassword(state.currentPassword, state.newPassword);
			toast.success('Password changed');
		} catch (error: any) {
			toast.error(error.message);
		}

		setState({
			...state,
			openDialog: false,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		});
	};

	const handleCancelChange = async () => {
		setState({
			...state,
			openDialog: false,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		});
	};

	const render = () => {
		return (
			<>
				<Card>
					<CardHeader
						subheader={
							<Typography
								sx={{
									fontWeight: 'bold',
								}}>
								Password
							</Typography>
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
									<Typography
										variant='body2'
										sx={{ color: 'text.secondary' }}>
										Password change requires to insert your current password, the new one and
										confirm it.
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
							onClick={handleChange}
							variant='contained'>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					open={state.openDialog}
					title='Change Password'
					acceptable={validate()}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<PasswordField
						label='Current Password'
						placeholder='*****'
						value={state.currentPassword}
						onChange={(event: any) => setState({ ...state, currentPassword: event.target.value })}
						autoFocus
						fullWidth
						margin='dense'
						variant='standard'
					/>
					<PasswordField
						label='New Password'
						placeholder='*****'
						value={state.newPassword}
						onChange={(event: any) => setState({ ...state, newPassword: event.target.value })}
						fullWidth
						margin='dense'
						variant='standard'
					/>
					<PasswordField
						label='Confirm Password'
						placeholder='*****'
						value={state.confirmPassword}
						onChange={(event: any) => setState({ ...state, confirmPassword: event.target.value })}
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

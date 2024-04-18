import * as React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../../../components/Dialog/ConfirmationDialog';
import { AppViewType, AppStateType } from '../../../../../../states/AppState';

interface IProfileDangerZoneCardProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface IProfileDangerZoneCardState {
	openDialog: boolean;
	password: string;
}

export const ProfileDangerZoneCard: React.FC<IProfileDangerZoneCardProps> = (
	props: IProfileDangerZoneCardProps,
): JSX.Element => {
	const [state, setState] = React.useState<IProfileDangerZoneCardState>({
		openDialog: false,
		password: '',
	});

	const validate = (): boolean => {
		return state.password !== '';
	};

	const handleDeleteAccount = async () => {
		setState({
			...state,
			openDialog: true,
		});
	};

	const handleAcceptDeleteAccount = async () => {
		try {
			await props.appState.apiClient?.authService.signDown(state.password);
			props.setAppState({
				...props.appState,
				appView: AppViewType.SignIn,
			});
			toast.success('Account deleted');
		} catch (error: any) {
			toast.error(error.message);
		}

		setState({
			...state,
			openDialog: false,
		});
	};

	const handleCancelDeleteAccount = async () => {
		setState({
			...state,
			openDialog: false,
		});
	};

	const render = () => {
		return (
			<>
				<Card
					sx={{
						border: '1px solid',
						borderColor: 'error.main',
					}}>
					<CardHeader
						subheader={
							<Typography
								sx={{
									fontWeight: 'bold',
								}}>
								Danger Zone
							</Typography>
						}
					/>
					<Divider />
					<CardContent>
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
									<Box
										sx={{
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'space-between',
										}}>
										<Box>
											<Typography>Delete Account</Typography>
											<Typography
												variant='body2'
												sx={{
													color: 'text.secondary',
													marginTop: '5px',
												}}>
												This action is irreversible, there is no going back. Please be certain.
											</Typography>
										</Box>
										<Button
											onClick={handleDeleteAccount}
											variant='contained'
											color='error'>
											Delete
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</CardContent>
					<Divider />
					<CardContent>{/* More dangerous actions */}</CardContent>
				</Card>
				<ConfirmationDialog
					open={state.openDialog}
					title='Delete Account'
					acceptable={validate()}
					onAccept={handleAcceptDeleteAccount}
					onCancel={handleCancelDeleteAccount}
					onClose={handleCancelDeleteAccount}>
					<Typography>Confirm your password to delete your account.</Typography>
					<TextField
						type='password'
						value={state.password}
						onChange={(event: any) => setState({ ...state, password: event.target.value })}
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

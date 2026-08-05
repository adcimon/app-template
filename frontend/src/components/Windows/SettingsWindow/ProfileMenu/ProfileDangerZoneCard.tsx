import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { SignDownForm } from '../../../../forms/SignDownForm/SignDownForm';
import { useNavigator } from '../../../../core/hooks/useNavigator';
import { useAppState } from '../../../../states/app/useAppState';
import { useSignDownForm } from '../../../../forms/SignDownForm/useSignDownForm';

export const ProfileDangerZoneCard = (): React.JSX.Element => {
	const navigator = useNavigator();
	const appState = useAppState();

	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const form = useSignDownForm();

	const handleDeleteAccount = async () => {
		setOpenDialog(true);
	};

	const handleAcceptDeleteAccount = async () => {
		try {
			await appState.signDown(form.values);
			ToastManager.success('Account deleted');
			appState.reset();
			setOpenDialog(false);
			navigator.navigate('/sign-in');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const handleCancelDeleteAccount = async () => {
		setOpenDialog(false);
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
									size={{
										xs: 12,
										sm: 12,
										md: 12,
									}}>
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
												This action is irreversible, there is no going back.<br></br>Please be
												certain.
											</Typography>
										</Box>
										<Button
											variant='contained'
											color='error'
											onClick={handleDeleteAccount}>
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
					title='Delete Account'
					open={openDialog}
					acceptable={form.validate()}
					onAccept={handleAcceptDeleteAccount}
					onCancel={handleCancelDeleteAccount}
					onClose={handleCancelDeleteAccount}>
					<Typography>Confirm your password to delete your account.</Typography>
					<SignDownForm
						values={form.values}
						onChange={form.handleChange}
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

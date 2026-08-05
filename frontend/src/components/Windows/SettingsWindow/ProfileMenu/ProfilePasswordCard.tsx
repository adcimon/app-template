import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { ChangePasswordForm } from '../../../../forms/ChangePasswordForm/ChangePasswordForm';
import { useAppState } from '../../../../states/app/useAppState';
import { useChangePasswordForm } from '../../../../forms/ChangePasswordForm/useChangePasswordForm';

export const ProfilePasswordCard = (): React.JSX.Element => {
	const appState = useAppState();

	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const form = useChangePasswordForm();

	const handleChangePassword = async () => {
		form.reset();
		setOpenDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await appState.changePassword(form.values);
			ToastManager.success('Password changed');
		} catch (error: any) {
			ToastManager.error(error.message);
		}

		form.reset();
		setOpenDialog(false);
	};

	const handleCancelChange = async () => {
		form.reset();
		setOpenDialog(false);
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
									size={{
										xs: 12,
										sm: 12,
										md: 12,
									}}>
									<Typography
										variant='body2'
										sx={{
											color: 'text.secondary',
										}}>
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
							variant='contained'
							onClick={handleChangePassword}>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					title='Change Password'
					open={openDialog}
					acceptable={form.validate()}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<ChangePasswordForm
						values={form.values}
						onChange={form.handleChange}
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

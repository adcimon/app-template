import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { ChangePhoneForm } from '../../../../forms/ChangePhoneForm/ChangePhoneForm';
import { useChangePhoneForm } from '../../../../forms/ChangePhoneForm/useChangePhoneForm';
import { useUserState } from '../../../../states/user/useUserState';

export const ProfilePhoneCard = (): React.JSX.Element => {
	const userState = useUserState();

	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const form = useChangePhoneForm(userState.user?.phone);

	const handleChange = async () => {
		setOpenDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await userState.updatePhone(form.values);
			ToastManager.success('Phone changed');
		} catch (error: any) {
			ToastManager.error(error.message);
		}

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
							<Stack
								direction='row'
								sx={{
									gap: '0.25rem',
								}}>
								<Typography
									sx={{
										color: 'text.primary',
										display: 'inline',
										fontWeight: 'bold',
									}}>
									Phone
								</Typography>
								<VerificationBadge verified={userState.user?.phoneVerified ?? false} />
							</Stack>
						}
					/>
					<CardContent
						sx={{
							paddingTop: 0,
						}}>
						<ChangePhoneForm
							values={form.values}
							onChange={form.handleChange}
						/>
					</CardContent>
					<Divider />
					<CardActions
						sx={{
							justifyContent: 'flex-end',
						}}>
						<Button
							disabled={!form.validate()}
							variant='contained'
							onClick={handleChange}>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					title='Change Phone'
					open={openDialog}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<Typography>Do you want to change your phone number?</Typography>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

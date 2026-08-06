import React from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { ChangeEmailForm } from '../../../../forms/ChangeEmailForm/ChangeEmailForm';
import { ConfirmEmailForm } from '../../../../forms/ConfirmEmailForm/ConfirmEmailForm';
import { VerifyEmailForm } from '../../../../forms/VerifyEmailForm/VerifyEmailForm';
import { useAppState } from '../../../../states/app/useAppState';
import { useUserState } from '../../../../states/user/useUserState';
import { useChangeEmailForm } from '../../../../forms/ChangeEmailForm/useChangeEmailForm';
import { useConfirmEmailForm } from '../../../../forms/ConfirmEmailForm/useConfirmEmailForm';
import { useVerifyEmailForm } from '../../../../forms/VerifyEmailForm/useVerifyEmailForm';

export const ProfileEmailCard = (): React.JSX.Element => {
	const appState = useAppState();
	const userState = useUserState();

	const [openChangeDialog, setOpenChangeDialog] = React.useState<boolean>(false);
	const [openVerifyDialog, setOpenVerifyDialog] = React.useState<boolean>(false);

	const changeEmailForm = useChangeEmailForm(userState.user?.email);
	const confirmEmailForm = useConfirmEmailForm();
	const verifyEmailForm = useVerifyEmailForm();

	const handleVerify = async () => {
		verifyEmailForm.reset();
		setOpenVerifyDialog(true);
	};

	const handleAcceptVerify = async () => {
		try {
			await appState.verifyEmail(verifyEmailForm.values);
			await userState.get();
			ToastManager.success('Email changed');
		} catch (error: any) {
			ToastManager.error(error.message);
		}

		setOpenVerifyDialog(false);
	};

	const handleCancelVerify = async () => {
		setOpenVerifyDialog(false);
	};

	const handleOpenChange = async () => {
		confirmEmailForm.reset();
		setOpenChangeDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await userState.updateEmail(changeEmailForm.values);
			ToastManager.success('Verification code sent');
		} catch (error: any) {
			ToastManager.error(error.message);
		}

		setOpenChangeDialog(false);
	};

	const handleCancelChange = async () => {
		setOpenChangeDialog(false);
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
									Email
								</Typography>
								<VerificationBadge verified={userState.user?.emailVerified ?? false} />
							</Stack>
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
									<ChangeEmailForm
										values={changeEmailForm.values}
										onChange={changeEmailForm.handleChange}
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
							variant='contained'
							disabled={userState.user?.emailVerified ?? false}
							onClick={handleVerify}>
							Verify
						</Button>
						<Button
							variant='contained'
							disabled={!changeEmailForm.validate()}
							onClick={handleOpenChange}>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					title='Change Email'
					open={openChangeDialog}
					acceptable={changeEmailForm.values.email === confirmEmailForm.values.confirmEmail}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<Typography>Confirm your new email to change it.</Typography>
					<ConfirmEmailForm
						values={confirmEmailForm.values}
						onChange={confirmEmailForm.handleChange}
					/>
				</ConfirmationDialog>
				<ConfirmationDialog
					title='Verify Email'
					open={openVerifyDialog}
					acceptable={verifyEmailForm.validate()}
					onAccept={handleAcceptVerify}
					onCancel={handleCancelVerify}
					onClose={handleCancelVerify}>
					<Typography>Insert the verification code to change your email.</Typography>
					<VerifyEmailForm
						values={verifyEmailForm.values}
						onChange={verifyEmailForm.handleChange}
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

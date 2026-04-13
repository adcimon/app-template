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
	TextField,
	Typography,
} from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { EmailField } from '../../../../core/components/Field/EmailField';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { useAppState } from '../../../../states/app/useAppState';
import { useUserState } from '../../../../states/user/useUserState';
import { AppUtils } from '../../../../utils/appUtils';

export const ProfileEmailCard = (): React.JSX.Element => {
	const appState = useAppState();
	const userState = useUserState();

	const [email, setEmail] = React.useState<string>(userState.user?.email ?? '');
	const [newEmail, setNewEmail] = React.useState<string>('');
	const [code, setCode] = React.useState<string>('');
	const [openVerifyDialog, setOpenVerifyDialog] = React.useState<boolean>(false);
	const [openChangeDialog, setOpenChangeDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(email) && email !== userState.user?.email;
	};

	const handleVerify = async () => {
		setCode('');
		setOpenVerifyDialog(true);
	};

	const handleAcceptVerify = async () => {
		try {
			await appState.verifyEmail(code);
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

	const handleChange = async () => {
		setOpenChangeDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await userState.updateEmail(email);
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
								spacing={0.5}>
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
									<EmailField
										label='Email'
										value={email}
										onChange={(event: any) => setEmail(event.target.value)}
										fullWidth={true}
										slotProps={{
											inputLabel: {
												shrink: true,
											},
										}}
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
							onClick={handleVerify}>
							Verify
						</Button>
						<Button
							disabled={!validate()}
							variant='contained'
							onClick={handleChange}>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					title='Change Email'
					open={openChangeDialog}
					acceptable={email === newEmail}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<Typography>Confirm your new email to change it.</Typography>
					<EmailField
						variant='standard'
						value={newEmail}
						autoFocus={true}
						onChange={(event: any) => setNewEmail(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
				</ConfirmationDialog>
				<ConfirmationDialog
					title='Verify Email'
					open={openVerifyDialog}
					acceptable={code !== ''}
					onAccept={handleAcceptVerify}
					onCancel={handleCancelVerify}
					onClose={handleCancelVerify}>
					<Typography>Insert the verification code to change your email.</Typography>
					<TextField
						type='number'
						variant='standard'
						value={code}
						autoFocus={true}
						onChange={(event: any) => setCode(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

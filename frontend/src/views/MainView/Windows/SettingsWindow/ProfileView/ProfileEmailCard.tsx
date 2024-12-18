import React from 'react';
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
import { ConfirmationDialog } from '../../../../../components/Dialog/ConfirmationDialog';
import { VerificationBadge } from '../../../../../components/Badge/VerificationBadge';
import { useAppState } from '../../../../../states/hooks/useAppState';
import { useUserState } from '../../../../../states/hooks/useUserState';
import { Utils } from '../../../../../utils/utils';

export const ProfileEmailCard: React.FC = (): JSX.Element => {
	const appState = useAppState();
	const userState = useUserState();

	const [email, setEmail] = React.useState<string>('');
	const [newEmail, setNewEmail] = React.useState<string>('');
	const [code, setCode] = React.useState<string>('');
	const [openVerifyDialog, setOpenVerifyDialog] = React.useState<boolean>(false);
	const [openChangeDialog, setOpenChangeDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return Utils.EMAIL_REGEXP.test(email) && email !== userState.user?.email;
	};

	const handleVerify = async () => {
		setCode('');
		setOpenVerifyDialog(true);
	};

	const handleAcceptVerify = async () => {
		try {
			await appState.verifyEmail(code);
			await userState.get();
			toast.success('Email changed');
		} catch (error: any) {
			toast.error(error.message);
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
			toast.success('Verification code sent');
		} catch (error: any) {
			toast.error(error.message);
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
									<VerificationBadge verified={userState.user?.emailVerified ?? false} />
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
										value={email}
										onChange={(event: any) => setEmail(event.target.value)}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth={true}
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
					<TextField
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

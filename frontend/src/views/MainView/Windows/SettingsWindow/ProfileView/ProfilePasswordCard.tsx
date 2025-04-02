import React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../../core/components/Dialog/ConfirmationDialog';
import { PasswordField } from '../../../../../core/components/Field/PasswordField';
import { useAppState } from '../../../../../states/app/useAppState';

export const ProfilePasswordCard: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [currentPassword, setCurrentPassword] = React.useState<string>('');
	const [newPassword, setNewPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return newPassword !== '' && currentPassword !== newPassword && newPassword === confirmPassword;
	};

	const handleChange = async () => {
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setOpenDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await appState.changePassword(currentPassword, newPassword);
			toast.success('Password changed');
		} catch (error: any) {
			toast.error(error.message);
		}

		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setOpenDialog(false);
	};

	const handleCancelChange = async () => {
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
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
							<Grid2
								container
								spacing={3}>
								<Grid2
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
								</Grid2>
							</Grid2>
						</Box>
					</CardContent>
					<Divider />
					<CardActions
						sx={{
							justifyContent: 'flex-end',
						}}>
						<Button
							variant='contained'
							onClick={handleChange}>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					title='Change Password'
					open={openDialog}
					acceptable={validate()}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<PasswordField
						variant='standard'
						label='Current Password'
						placeholder='*****'
						value={currentPassword}
						autoFocus={true}
						onChange={(event: any) => setCurrentPassword(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
					<PasswordField
						variant='standard'
						label='New Password'
						placeholder='*****'
						value={newPassword}
						onChange={(event: any) => setNewPassword(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
					<PasswordField
						variant='standard'
						label='Confirm Password'
						placeholder='*****'
						value={confirmPassword}
						onChange={(event: any) => setConfirmPassword(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

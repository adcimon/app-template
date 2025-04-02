import React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../../core/components/Dialog/ConfirmationDialog';
import { PasswordField } from '../../../../../core/components/Field/PasswordField';
import { useAppState } from '../../../../../states/app/useAppState';

export const ProfileDangerZoneCard: React.FC = (): JSX.Element => {
	const appState = useAppState();

	const [password, setPassword] = React.useState<string>('');
	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return password !== '';
	};

	const handleDeleteAccount = async () => {
		setOpenDialog(true);
	};

	const handleAcceptDeleteAccount = async () => {
		try {
			await appState.signDown(password);
			toast.success('Account deleted');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			appState.reset();
		}

		setOpenDialog(false);
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
							<Grid2
								container
								spacing={3}>
								<Grid2
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
								</Grid2>
							</Grid2>
						</Box>
					</CardContent>
					<Divider />
					<CardContent>{/* More dangerous actions */}</CardContent>
				</Card>
				<ConfirmationDialog
					title='Delete Account'
					open={openDialog}
					acceptable={validate()}
					onAccept={handleAcceptDeleteAccount}
					onCancel={handleCancelDeleteAccount}
					onClose={handleCancelDeleteAccount}>
					<Typography>Confirm your password to delete your account.</Typography>
					<PasswordField
						variant='standard'
						value={password}
						autoFocus={true}
						onChange={(event: any) => setPassword(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

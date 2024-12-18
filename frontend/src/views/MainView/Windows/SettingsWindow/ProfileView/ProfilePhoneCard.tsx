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
import { useUserState } from '../../../../../states/hooks/useUserState';
import { Utils } from '../../../../../utils/utils';

export const ProfilePhoneCard: React.FC = (): JSX.Element => {
	const userState = useUserState();

	const [phone, setPhone] = React.useState<string>(userState.user?.phone ?? '');
	const [confirmPhone, setConfirmPhone] = React.useState<string>('');
	const [openChangeDialog, setOpenChangeDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return Utils.PHONE_REGEXP.test(phone) && phone !== userState.user?.phone;
	};

	const handleChange = async () => {
		setOpenChangeDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await userState.updatePhone(phone);
			toast.success('Phone changed');
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
										Phone
									</Typography>
									<VerificationBadge verified={userState.user?.phoneVerified ?? false} />
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
										label='Phone'
										type='tel'
										value={phone}
										onChange={(event: any) => setPhone(event.target.value)}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth
									/>
									<Typography
										variant='body2'
										sx={{
											color: 'text.secondary',
											marginTop: '15px',
										}}>
										Phone number with country prefix.
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
							disabled={!validate()}
							variant='contained'
							onClick={handleChange}>
							Change
						</Button>
					</CardActions>
				</Card>
				<ConfirmationDialog
					title='Change Phone'
					open={openChangeDialog}
					acceptable={phone === confirmPhone}
					onAccept={handleAcceptChange}
					onCancel={handleCancelChange}
					onClose={handleCancelChange}>
					<Typography>Confirm your new phone number to change it.</Typography>
					<TextField
						type='tel'
						variant='standard'
						value={confirmPhone}
						onChange={(event: any) => setConfirmPhone(event.target.value)}
						autoFocus
						fullWidth
						margin='dense'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

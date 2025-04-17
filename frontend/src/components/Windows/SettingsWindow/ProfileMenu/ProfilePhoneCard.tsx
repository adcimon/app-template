import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { PhoneField } from '../../../../core/components/Field/PhoneField';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { useUserState } from '../../../../states/user/useUserState';
import { AppUtils } from '../../../../utils/appUtils';

export const ProfilePhoneCard = (): React.JSX.Element => {
	const userState = useUserState();

	const [phone, setPhone] = React.useState<string>(userState.user?.phone ?? '');
	const [confirmPhone, setConfirmPhone] = React.useState<string>('');
	const [openChangeDialog, setOpenChangeDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		return AppUtils.PHONE_REGEXP.test(phone) && phone !== userState.user?.phone;
	};

	const handleChange = async () => {
		setOpenChangeDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			await userState.updatePhone(phone);
			ToastManager.success('Phone changed');
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
									<PhoneField
										label='Phone'
										value={phone}
										onChange={(event: any) => setPhone(event.target.value)}
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
										Phone number with country prefix.
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
					<PhoneField
						variant='standard'
						value={confirmPhone}
						autoFocus={true}
						onChange={(event: any) => setConfirmPhone(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

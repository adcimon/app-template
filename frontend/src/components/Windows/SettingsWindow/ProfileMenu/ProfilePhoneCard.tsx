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
import { countries, CountrySelect, CountryType } from '../../../../core/components/Select/CountrySelect';
import { PhoneField } from '../../../../core/components/Field/PhoneField';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { useUserState } from '../../../../states/user/useUserState';
import { AppUtils } from '../../../../utils/appUtils';
import { PhoneUtils } from '../../../../core/utils/phoneUtils';

export const ProfilePhoneCard = (): React.JSX.Element => {
	const userState = useUserState();

	const [countryCode, setCountryCode] = React.useState<string>(
		PhoneUtils.getCountryCode(userState.user?.phone ?? ''),
	);
	const [nationalNumber, setNationalNumber] = React.useState<string>(
		PhoneUtils.getNationalNumber(userState.user?.phone ?? ''),
	);

	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const validate = (): boolean => {
		const phone: string = `+${countryCode}${nationalNumber}`;
		return AppUtils.PHONE_REGEXP.test(phone) && phone !== userState.user?.phone;
	};

	const handleChange = async () => {
		setOpenDialog(true);
	};

	const handleAcceptChange = async () => {
		try {
			const phone: string = `+${countryCode}${nationalNumber}`;
			await userState.updatePhone(phone);
			ToastManager.success('Phone changed');
		} catch (error: any) {
			ToastManager.error(error.message);
		}

		setOpenDialog(false);
	};

	const handleCancelChange = async () => {
		setCountryCode(PhoneUtils.getCountryCode(userState.user?.phone ?? ''));
		setNationalNumber(PhoneUtils.getNationalNumber(userState.user?.phone ?? ''));
		setOpenDialog(false);
	};

	const render = () => {
		const country: CountryType | undefined = countries.find(
			(country: CountryType) => country.phone === countryCode,
		);
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
										md: 12,
										lg: 12,
									}}>
									<CountrySelect
										value={country?.code}
										onChange={(event: any) => setCountryCode(event.target.value?.phone)}
										slotProps={{
											inputLabel: {
												shrink: true,
											},
										}}
									/>
								</Grid2>
								<Grid2
									size={{
										xs: 12,
										md: 12,
										lg: 12,
									}}>
									<PhoneField
										label='Phone'
										value={nationalNumber}
										onChange={(event: any) => setNationalNumber(event.target.value)}
										fullWidth={true}
										slotProps={{
											inputLabel: {
												shrink: true,
											},
										}}
									/>
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

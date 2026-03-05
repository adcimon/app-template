import React from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Grid2,
	TextField,
	Typography,
} from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { LocaleSelect } from '../../../../core/components/Select/LocaleSelect';
import { TimezoneSelect } from '../../../../core/components/Select/TimezoneSelect';
import { useUserState } from '../../../../states/user/useUserState';

export const ProfileDetailsCard = (): React.JSX.Element => {
	const userState = useUserState();

	const [name, setName] = React.useState<string>(userState.user?.name || '');
	const [surname, setSurname] = React.useState<string>(userState.user?.surname || '');
	const [birthdate, setBirthdate] = React.useState<string>(userState.user?.birthdate || '');
	const [locale, setLocale] = React.useState<string>(userState.user?.locale || '');
	const [timezone, setTimezone] = React.useState<string>(userState.user?.timezone || '');

	const validate = (): boolean => {
		const userName: string = userState.user?.name || '';
		const userSurname: string = userState.user?.surname || '';
		const userBirthdate: string = userState.user?.birthdate || '';
		const userLocale: string = userState.user?.locale || '';
		const userTimezone: string = userState.user?.timezone || '';

		return !(
			name === userName &&
			surname === userSurname &&
			birthdate === userBirthdate &&
			locale === userLocale &&
			timezone === userTimezone
		);
	};

	const handleSave = async () => {
		try {
			await userState.update({
				name: name,
				surname: surname,
				birthdate: birthdate,
				locale: locale,
				timezone: timezone,
			});
			ToastManager.success('Profile updated');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const render = () => {
		return (
			<Card>
				<CardHeader
					subheader={
						<Typography
							sx={{
								fontWeight: 'bold',
							}}>
							Details
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
									md: 6,
								}}>
								<TextField
									label='Name'
									value={name}
									onChange={(event: any) => setName(event.target.value)}
									fullWidth={true}
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
									md: 6,
								}}>
								<TextField
									label='Surname'
									value={surname}
									onChange={(event: any) => setSurname(event.target.value)}
									fullWidth={true}
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
									md: 6,
								}}>
								<TextField
									label='Birthdate'
									type='date'
									value={birthdate}
									onChange={(event: any) => setBirthdate(event.target.value)}
									fullWidth={true}
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
									md: 6,
								}}>
								<LocaleSelect
									value={locale}
									onChange={(event: any) => setLocale(event.target.value?.code || '')}
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
									md: 6,
								}}>
								<TimezoneSelect
									value={timezone}
									onChange={(event: any) => setTimezone(event.target.value)}
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
						onClick={handleSave}>
						Save
					</Button>
				</CardActions>
			</Card>
		);
	};

	return render();
};

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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CountrySelect } from '../../../../../core/components/Select/CountrySelect';
import { TimezoneSelect } from '../../../../../core/components/Select/TimezoneSelect';
import { useUserState } from '../../../../../states/user/useUserState';

export const ProfileDetailsCard = (): JSX.Element => {
	const userState = useUserState();

	const [name, setName] = React.useState<string>(userState.user?.name || '');
	const [surname, setSurname] = React.useState<string>(userState.user?.surname || '');
	const [birthdate, setBirthdate] = React.useState<string>(userState.user?.birthdate || '');
	const [country, setCountry] = React.useState<string>(userState.user?.country || '');
	const [timezone, setTimezone] = React.useState<string>(userState.user?.timezone || '');

	const validate = (): boolean => {
		const userName: string = userState.user?.name || '';
		const userSurname: string = userState.user?.surname || '';
		const userBirthdate: string = userState.user?.birthdate || '';
		const userCountry: string = userState.user?.country || '';
		const userTimezone: string = userState.user?.timezone || '';

		return !(
			name === userName &&
			surname === userSurname &&
			birthdate === userBirthdate &&
			country === userCountry &&
			timezone === userTimezone
		);
	};

	const handleSave = async () => {
		try {
			await userState.update({
				name: name,
				surname: surname,
				birthdate: birthdate,
				country: country,
				timezone: timezone,
			});
			toast.success('Profile updated');
		} catch (error: any) {
			toast.error(error.message);
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
									sm: 6,
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
									sm: 6,
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
									sm: 6,
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
									sm: 6,
								}}>
								<CountrySelect
									label='Country'
									value={country}
									onChange={(event: any) => setCountry(event.target.value?.code || '')}
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
									sm: 6,
								}}>
								<TimezoneSelect
									label='Timezone'
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

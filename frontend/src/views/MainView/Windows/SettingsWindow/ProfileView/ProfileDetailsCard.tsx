import * as React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CountrySelect } from '../../../../../components/Select/CountrySelect';
import { TimezoneSelect } from '../../../../../components/Select/TimezoneSelect';
import { useUserState } from '../../../../../states/hooks/useUserState';

interface IProfileDetailsCardState {
	name: string;
	surname: string;
	birthdate: string;
	country: string;
	timezone: string;
}

export const ProfileDetailsCard: React.FC = (): JSX.Element => {
	const userState = useUserState();

	const [state, setState] = React.useState<IProfileDetailsCardState>({
		name: userState.user.name || '',
		surname: userState.user.surname || '',
		birthdate: userState.user.birthdate || '',
		country: userState.user.country || '',
		timezone: userState.user.timezone || '',
	});

	const validate = (): boolean => {
		const name: string = userState.user.name || '';
		const familyName: string = userState.user.surname || '';
		const birthdate: string = userState.user.birthdate || '';
		const country: string = userState.user.country || '';
		const timezone: string = userState.user.timezone || '';

		return !(
			state.name === name &&
			state.surname === familyName &&
			state.birthdate === birthdate &&
			state.country === country &&
			state.timezone === timezone
		);
	};

	const handleSave = async () => {
		try {
			await userState.update({
				name: state.name,
				surname: state.surname,
				birthdate: state.birthdate,
				country: state.country,
				timezone: state.timezone,
			});
			toast.success('Profile updated');
		} catch (error: any) {
			toast.error(error.message);
		}
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
							<Grid
								container
								spacing={3}>
								<Grid
									item
									xs={12}
									md={6}>
									<TextField
										label='Name'
										value={state.name}
										onChange={(event: any) => setState({ ...state, name: event.target.value })}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}>
									<TextField
										label='Surname'
										value={state.surname}
										onChange={(event: any) => setState({ ...state, surname: event.target.value })}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}>
									<TextField
										label='Birthdate'
										type='date'
										value={state.birthdate}
										onChange={(event: any) => setState({ ...state, birthdate: event.target.value })}
										InputLabelProps={{
											shrink: true,
										}}
										fullWidth
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}>
									<CountrySelect
										label='Country'
										value={state.country}
										onChange={(event: any) =>
											setState({ ...state, country: event.target.value?.code || '' })
										}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}>
									<TimezoneSelect
										label='Timezone'
										value={state.timezone}
										onChange={(event: any) => setState({ ...state, timezone: event.target.value })}
										InputLabelProps={{
											shrink: true,
										}}
									/>
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
							onClick={handleSave}
							variant='contained'>
							Save
						</Button>
					</CardActions>
				</Card>
			</>
		);
	};

	return render();
};

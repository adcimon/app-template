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
import { CountrySelect } from '../../../../../../components/Select/CountrySelect';
import { TimezoneSelect } from '../../../../../../components/Select/TimezoneSelect';
import { useAppState } from '../../../../../../hooks/useAppState';

interface IProfileDetailsCardState {
	name: string;
	surname: string;
	birthdate: string;
	country: string;
	timezone: string;
}

export const ProfileDetailsCard: React.FC = (): JSX.Element => {
	const { appState, setAppState } = useAppState();

	const [state, setState] = React.useState<IProfileDetailsCardState>({
		name: appState.user.name || '',
		surname: appState.user.surname || '',
		birthdate: appState.user.birthdate || '',
		country: appState.user.country || '',
		timezone: appState.user.timezone || '',
	});

	const validate = (): boolean => {
		const name: string = appState.user.name || '';
		const familyName: string = appState.user.surname || '';
		const birthdate: string = appState.user.birthdate || '';
		const country: string = appState.user.country || '';
		const timezone: string = appState.user.timezone || '';

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
			const user: any = await appState.apiClient?.usersService.updateMyUser({
				name: state.name,
				surname: state.surname,
				birthdate: state.birthdate,
				country: state.country,
				timezone: state.timezone,
			});
			setAppState({
				...appState,
				user: user,
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
										InputLabelProps={{ shrink: true }}
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
										InputLabelProps={{ shrink: true }}
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
										InputLabelProps={{ shrink: true }}
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
										InputLabelProps={{ shrink: true }}
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
										InputLabelProps={{ shrink: true }}
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

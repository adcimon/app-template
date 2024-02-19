import * as React from 'react';
import toast from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import { ProfileDangerZoneCard } from './ProfileDangerZoneCard';
import { ProfileDetailsCard } from './ProfileDetailsCard';
import { ProfileEmailCard } from './ProfileEmailCard';
import { ProfilePasswordCard } from './ProfilePasswordCard';
import { ProfilePhoneCard } from './ProfilePhoneCard';
import { AppStateType } from '../../../../../../states/AppState';

interface IProfileViewProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

export const ProfileView: React.FC<IProfileViewProps> = (props: IProfileViewProps): JSX.Element => {
	React.useEffect(() => {
		getMyUser();
	}, []);

	const getMyUser = async () => {
		try {
			const user: any = await props.appState.backendClient?.usersClient.getMyUser();
			props.setAppState({
				...props.appState,
				user: user,
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const render = () => {
		return (
			<>
				<Grid
					container
					spacing={3}
					sx={{
						width: '100%',
						'& > *': {
							padding: '10px !important',
						},
					}}>
					<Grid
						item
						xs={12}
						md={6}
						lg={12}>
						<ProfileDetailsCard
							appState={props.appState}
							setAppState={props.setAppState}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfileEmailCard
							appState={props.appState}
							setAppState={props.setAppState}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfilePhoneCard
							appState={props.appState}
							setAppState={props.setAppState}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfilePasswordCard
							appState={props.appState}
							setAppState={props.setAppState}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfileDangerZoneCard
							appState={props.appState}
							setAppState={props.setAppState}
						/>
					</Grid>
				</Grid>
			</>
		);
	};

	return render();
};

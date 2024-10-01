import React from 'react';
import toast from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import { ProfileDangerZoneCard } from './ProfileDangerZoneCard';
import { ProfileDetailsCard } from './ProfileDetailsCard';
import { ProfileEmailCard } from './ProfileEmailCard';
import { ProfilePasswordCard } from './ProfilePasswordCard';
import { ProfilePhoneCard } from './ProfilePhoneCard';
import { useUserState } from '../../../../../states/hooks/useUserState';

export const ProfileView: React.FC = (): JSX.Element => {
	const userState = useUserState();

	React.useEffect(() => {
		getMyUser();
	}, []);

	const getMyUser = async () => {
		try {
			await userState.get();
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
						<ProfileDetailsCard />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfileEmailCard />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfilePhoneCard />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfilePasswordCard />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}>
						<ProfileDangerZoneCard />
					</Grid>
				</Grid>
			</>
		);
	};

	return render();
};

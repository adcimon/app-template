import React from 'react';
import { Grid } from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { ProfileDangerZoneCard } from './ProfileDangerZoneCard';
import { ProfileDetailsCard } from './ProfileDetailsCard';
import { ProfileEmailCard } from './ProfileEmailCard';
import { ProfilePasswordCard } from './ProfilePasswordCard';
import { ProfilePhoneCard } from './ProfilePhoneCard';
import { useUserState } from '../../../../states/user/useUserState';

export const ProfileMenu = (): React.JSX.Element => {
	const userState = useUserState();

	React.useEffect(() => {
		getMyUser();
	}, []);

	const getMyUser = async () => {
		try {
			await userState.get();
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const render = () => {
		return (
			<Grid
				container
				sx={{
					width: '100%',
					'& > *': {
						padding: '10px !important',
					},
				}}>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						md: 12,
					}}>
					<ProfileDetailsCard />
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfileEmailCard />
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfilePhoneCard />
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfilePasswordCard />
				</Grid>
				<Grid
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfileDangerZoneCard />
				</Grid>
			</Grid>
		);
	};

	return render();
};

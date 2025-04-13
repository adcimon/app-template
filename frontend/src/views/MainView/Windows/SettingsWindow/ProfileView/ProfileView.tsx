import React from 'react';
import toast from 'react-hot-toast';
import Grid2 from '@mui/material/Grid2';
import { ProfileDangerZoneCard } from './ProfileDangerZoneCard';
import { ProfileDetailsCard } from './ProfileDetailsCard';
import { ProfileEmailCard } from './ProfileEmailCard';
import { ProfilePasswordCard } from './ProfilePasswordCard';
import { ProfilePhoneCard } from './ProfilePhoneCard';
import { useUserState } from '../../../../../states/user/useUserState';

export const ProfileView = (): JSX.Element => {
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
			<Grid2
				container
				sx={{
					width: '100%',
					'& > *': {
						padding: '10px !important',
					},
				}}>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 12,
					}}>
					<ProfileDetailsCard />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfileEmailCard />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfilePhoneCard />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfilePasswordCard />
				</Grid2>
				<Grid2
					size={{
						xs: 12,
						sm: 6,
						md: 6,
					}}>
					<ProfileDangerZoneCard />
				</Grid2>
			</Grid2>
		);
	};

	return render();
};

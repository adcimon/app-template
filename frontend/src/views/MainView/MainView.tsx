import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ToastManager } from '../../managers/ToastManager/ToastManager';
import { HomeView } from './HomeView/HomeView';
import { MainBar } from '../../components/MainBar/MainBar';
import { useUserState } from '../../states/user/useUserState';

export const MainView = (): React.JSX.Element => {
	const mainBarHeight: string = '64px';

	const userState = useUserState();

	React.useEffect(() => {
		ToastManager.success('Welcome!');
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
			<Stack
				direction='column'
				sx={{
					alignItems: 'center',
					height: '100vh',
					width: '100vw',
				}}>
				<MainBar height={mainBarHeight} />
				<Box
					sx={{
						height: `calc(100% - ${mainBarHeight})`,
						width: '100%',
					}}>
					<HomeView />
				</Box>
			</Stack>
		);
	};

	return render();
};

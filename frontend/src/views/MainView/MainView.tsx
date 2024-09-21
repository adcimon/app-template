import * as React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import { HomeView } from './HomeView/HomeView';
import { MainBar } from './MainBar/MainBar';
import { useUserState } from '../../states/hooks/useUserState';

export const MainView: React.FC = (): JSX.Element => {
	const userState = useUserState();

	const mainBarHeight: string = '64px';

	React.useEffect(() => {
		toast.success('Welcome!');
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
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
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
				</Box>
			</>
		);
	};

	return render();
};

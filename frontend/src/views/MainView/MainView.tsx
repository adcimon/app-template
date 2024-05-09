import * as React from 'react';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import { HomeView } from './HomeView/HomeView';
import { MainBar } from './MainBar/MainBar';
import { AppStateType } from '../../states/AppState';

interface IMainViewProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

export const MainView: React.FC<IMainViewProps> = (props: IMainViewProps): JSX.Element => {
	const mainBarHeight: string = '64px';

	React.useEffect(() => {
		toast.success('Welcome!');
		getMyUser();
	}, []);

	const getMyUser = async () => {
		try {
			const user: any = await props.appState.apiClient?.usersService.getMyUser();
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
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						height: '100vh',
						width: '100vw',
					}}>
					<MainBar
						height={mainBarHeight}
						appState={props.appState}
						setAppState={props.setAppState}
					/>
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

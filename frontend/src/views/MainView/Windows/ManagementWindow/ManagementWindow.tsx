import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { UsersView } from './UsersView';
import { Window } from '../../../../core/components/Window/Window';
import { useResponsive } from '../../../../core/hooks/useResponsive';

interface IManagementWindowProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const ManagementWindow = (props: IManagementWindowProps): JSX.Element => {
	const headerHeight: string = '290px';
	const responsiveHeaderHeight: string = '190px';

	const responsive: boolean = useResponsive();

	const [tab, setTab] = React.useState<number>(0);

	const handleTabChange = (event: any, value: number) => {
		setTab(value);
	};

	const handleClose = (event: any) => {
		setTab(0);
		if (props.onClose) {
			props.onClose(event);
		}
	};

	const renderHeader = () => {
		return (
			<>
				<Card>
					<Box
						sx={{
							backgroundAttachment: 'scroll scroll',
							backgroundClip: 'border-box border-box',
							backgroundImage:
								'linear-gradient(rgba(0, 79, 225, 0.8), rgba(1, 41, 114, 0.8)), url("/images/admin_banner.jpg")',
							backgroundOrigin: 'padding-box, padding-box',
							backgroundPosition: 'center center',
							backgroundSize: 'cover',
							height: responsive ? responsiveHeaderHeight : headerHeight,
							position: 'relative',
						}}
					/>
					<Tabs
						value={tab}
						onChange={handleTabChange}
						sx={{
							'& .MuiTabs-flexContainer': {
								justifyContent: responsive ? 'flex-start' : 'flex-end',
								paddingX: '2rem',
							},
						}}>
						<Tab
							label={
								<>
									<Stack
										direction='row'
										spacing={0.5}>
										<PeopleAltIcon />
										<Typography>Users</Typography>
									</Stack>
								</>
							}
						/>
					</Tabs>
				</Card>
			</>
		);
	};

	const renderTab = () => {
		return <>{tab === 0 && <UsersView />}</>;
	};

	const render = () => {
		return (
			<>
				<Window
					label='Management'
					open={props.open}
					onClose={handleClose}>
					{renderHeader()}
					{renderTab()}
				</Window>
			</>
		);
	};

	return render();
};

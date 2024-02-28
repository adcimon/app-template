import * as React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { GenericPopover } from '../../../Popover/GenericPopover';
import { NotificationItem } from './NotificationItem';
import { AppStateType } from '../../../../states/AppState';

interface INotificationsMenuProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface INotificationsMenuState {
	open: boolean;
	notifications: object[];
}

export const NotificationsMenu: React.FC<INotificationsMenuProps> = (props: INotificationsMenuProps): JSX.Element => {
	const [state, setState] = React.useState<INotificationsMenuState>({
		open: false,
		notifications: notifications,
	});

	const ref = React.useRef<any>(null);

	const handleClick = () => {
		setState({
			...state,
			open: !state.open,
		});
	};

	const handleClose = () => {
		setState({
			...state,
			open: false,
		});
	};

	const handleDelete = (index: number) => {
		const notifications = [...state.notifications];
		notifications.splice(index, 1);
		setState({
			...state,
			notifications,
		});
	};

	const render = () => {
		return (
			<>
				<Tooltip
					title='Notifications'
					placement='bottom'>
					<IconButton
						ref={ref}
						onClick={handleClick}
						sx={{
							color: 'white',
						}}>
						<Badge
							badgeContent={state?.notifications.length}
							color='error'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<GenericPopover
					anchorEl={ref}
					open={state.open}
					onClose={handleClose}
					sx={{
						width: '300px',
					}}>
					<Box
						sx={{
							marginX: 2,
							marginY: 1.5,
						}}>
						<Typography
							noWrap
							sx={{
								fontWeight: 'bold',
							}}>
							Notifications
						</Typography>
					</Box>
					<Divider />
					<MenuList
						disablePadding
						dense
						sx={{
							padding: '5px',
							paddingBottom: '10px',
							width: '100%',
						}}>
						{!state.notifications ||
							(state?.notifications.length === 0 && (
								<MenuItem disabled>There are no notifications</MenuItem>
							))}
						{state.notifications.map((notification: any, index: number) => (
							<NotificationItem
								key={index}
								notification={notification}
								onDelete={() => handleDelete(index)}
							/>
						))}
					</MenuList>
				</GenericPopover>
			</>
		);
	};

	return render();
};

const notifications: object[] = [
	{
		icon: '/images/logo_white.png',
		title: 'Welcome',
		description: 'Thank you for using this template!',
		date: new Date().toLocaleDateString(),
	},
];

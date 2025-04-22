import React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { NotificationItem } from './NotificationItem';
import { Popover } from '../../../core/components/Popover/Popover';

export const NotificationsMenu = (): React.JSX.Element => {
	const ref = React.useRef<any>(null);

	const [notifications, setNotifications] = React.useState<object[]>(defaultNotifications);
	const [open, setOpen] = React.useState<boolean>(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = (index: number) => {
		const newNotifications = [...notifications];
		newNotifications.splice(index, 1);
		setNotifications(newNotifications);
	};

	const render = () => {
		return (
			<>
				<Tooltip
					title='Notifications'
					placement='bottom'
					slotProps={{
						popper: {
							modifiers: [
								{
									name: 'offset',
									options: {
										offset: [0, -10],
									},
								},
							],
						},
					}}>
					<IconButton
						ref={ref}
						onClick={handleClick}
						sx={{
							color: 'white',
						}}>
						<Badge
							color='error'
							badgeContent={notifications.length}>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<Popover
					anchorEl={ref}
					open={open}
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
							noWrap={true}
							sx={{
								fontWeight: 'bold',
							}}>
							Notifications
						</Typography>
					</Box>
					<Divider />
					<MenuList
						disablePadding={true}
						dense={true}
						sx={{
							padding: '5px',
							paddingBottom: '10px',
							width: '100%',
						}}>
						{!notifications ||
							(notifications.length === 0 && <MenuItem disabled>There are no notifications</MenuItem>)}
						{notifications.map((notification: any, index: number) => (
							<NotificationItem
								key={index}
								notification={notification}
								onDelete={() => handleDelete(index)}
							/>
						))}
					</MenuList>
				</Popover>
			</>
		);
	};

	return render();
};

const defaultNotifications: object[] = [
	{
		icon: '/images/logo_white.png',
		title: 'Welcome',
		description: 'Thank you for using this template!',
		date: new Date().toLocaleDateString(),
	},
];

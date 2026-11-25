import React from 'react';
import { Divider, MenuItem, MenuList, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationItem } from './NotificationItem';
import { MenuButton } from '../../../core/components/Button/MenuButton';
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
				<MenuButton
					ref={ref}
					color='inherit'
					tooltip='Notifications'
					icon={<NotificationsIcon />}
					count={notifications.length}
					alert={true}
					active={open}
					onClick={handleClick}
				/>
				<Popover
					title={
						<Typography
							noWrap={true}
							sx={{
								fontWeight: 'bold',
							}}>
							Notifications
						</Typography>
					}
					anchorEl={ref}
					open={open}
					onClose={handleClose}
					sx={{
						width: '300px',
					}}>
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
		icon: '/images/logo_blue.png',
		title: 'Welcome',
		description: 'Thank you for using this template!',
		date: new Date().toLocaleDateString(),
	},
];

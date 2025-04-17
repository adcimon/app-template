import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';

interface NotificationTooltipProps {
	notification: any;
}

export const NotificationTooltip = (props: NotificationTooltipProps): React.JSX.Element => {
	const render = () => {
		return (
			<Box
				sx={{
					margin: '3px',
					minWidth: '200px',
				}}>
				<Box>
					<Stack
						direction='row'
						spacing={0.5}
						sx={{
							alignItems: 'center',
						}}>
						<NotificationsIcon
							sx={{
								fontSize: '1rem',
							}}
						/>
						<strong>{props.notification.title}</strong>
					</Stack>
				</Box>
				<Box>
					<Stack
						direction='row'
						spacing={0.5}
						sx={{
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Stack
							direction='row'
							spacing={0.5}
							sx={{
								alignItems: 'center',
							}}>
							<EventIcon
								sx={{
									fontSize: '1rem',
								}}
							/>
							<strong>{props.notification.date}</strong>
						</Stack>
					</Stack>
				</Box>
				<Divider
					sx={{
						backgroundColor: 'grey',
						marginY: '5px',
					}}
				/>
				<Box>{props.notification.description}</Box>
			</Box>
		);
	};

	return render();
};

import React from 'react';
import { Box, Divider, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
						sx={{
							alignItems: 'center',
							gap: '0.25rem',
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
						sx={{
							alignItems: 'center',
							gap: '0.25rem',
							justifyContent: 'space-between',
						}}>
						<Stack
							direction='row'
							sx={{
								alignItems: 'center',
								gap: '0.25rem',
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

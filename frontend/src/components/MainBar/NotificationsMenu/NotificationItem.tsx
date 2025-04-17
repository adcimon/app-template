import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { NotificationTooltip } from './NotificationTooltip';

interface NotificationItemProps {
	notification: any;
	onDelete?: (notification: any) => void;
}

export const NotificationItem = (props: NotificationItemProps): React.JSX.Element => {
	const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		event.preventDefault();
		props.onDelete?.(props.notification);
	};

	const render = () => {
		return (
			<Tooltip
				title={<NotificationTooltip notification={props.notification} />}
				placement='bottom-start'>
				<MenuItem
					disableGutters
					sx={{
						paddingX: '10px',
						width: '100%',
					}}>
					<Box
						sx={{
							width: '100%',
						}}>
						<Stack
							direction='row'
							spacing={1}
							sx={{
								alignItems: 'flex-start',
							}}>
							<Box>
								<Avatar
									src={props.notification.icon}
									sx={{
										height: '32px',
										marginTop: '3px',
										width: '32px',
									}}
								/>
							</Box>
							<Stack
								direction='column'
								sx={{
									width: '70%',
								}}>
								<Typography
									variant='subtitle2'
									noWrap={true}>
									{props.notification.title}
								</Typography>
								<Typography
									variant='body2'
									noWrap={true}
									sx={{
										color: 'text.secondary',
										fontSize: '0.75rem',
										marginTop: '5px',
									}}>
									{props.notification.description}
								</Typography>
								<Typography
									variant='body2'
									noWrap={true}
									sx={{
										color: 'text.secondary',
										fontSize: '0.75rem',
										marginTop: '5px',
									}}>
									{props.notification.date}
								</Typography>
							</Stack>
							<IconButton
								onClick={handleDelete}
								size='small'
								sx={{
									color: 'neutral.light',
									'&.MuiIconButton-root': {
										marginLeft: 'auto',
									},
								}}>
								<DeleteIcon fontSize='inherit' />
							</IconButton>
						</Stack>
					</Box>
				</MenuItem>
			</Tooltip>
		);
	};

	return render();
};

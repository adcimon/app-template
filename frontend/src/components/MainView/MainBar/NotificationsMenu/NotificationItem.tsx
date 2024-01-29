import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { NotificationTooltip } from './NotificationTooltip';

interface INotificationItemProps {
	notification: any;
	onDelete?: (notification: any) => void;
}

interface INotificationItemState {
	hover: boolean;
}

export const NotificationItem: React.FC<INotificationItemProps> = (props: INotificationItemProps): JSX.Element => {
	const [state, setState] = React.useState<INotificationItemState>({
		hover: false,
	});

	const handlePointerEnter = () => {
		setState({
			...state,
			hover: true,
		});
	};

	const handlePointerLeave = () => {
		setState({
			...state,
			hover: false,
		});
	};

	const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		event.preventDefault();
		if (props.onDelete) {
			props.onDelete(props.notification);
		}
	};

	const render = () => {
		return (
			<Tooltip
				title={<NotificationTooltip notification={props.notification} />}
				placement='bottom-start'>
				<MenuItem
					onPointerEnter={handlePointerEnter}
					onPointerLeave={handlePointerLeave}
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
									noWrap
									variant='subtitle2'>
									{props.notification.title}
								</Typography>
								<Typography
									noWrap
									variant='body2'
									sx={{
										color: 'text.secondary',
										fontSize: '12px',
										marginTop: '5px',
									}}>
									{props.notification.description}
								</Typography>
								<Typography
									noWrap
									variant='body2'
									sx={{
										color: 'text.secondary',
										fontSize: '12px',
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

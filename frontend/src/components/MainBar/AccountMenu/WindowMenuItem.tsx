import React from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import { useWindow } from '../../../core/windows/useWindow';

interface WindowMenuItemProps {
	id: string;
	onClick?: () => void;
}

export const WindowMenuItem = (props: WindowMenuItemProps): React.JSX.Element => {
	const handle = useWindow(props.id);

	const handleClick = () => {
		props.onClick?.();
		handle?.open();
	};

	const render = () => {
		if (!handle?.state.title) {
			return <></>;
		}

		return (
			<MenuItem onClick={handleClick}>
				<Box
					sx={{
						display: 'flex',
						paddingRight: '5px',
					}}>
					{handle.state.icon}
				</Box>
				<Typography>{handle.state.title}</Typography>
			</MenuItem>
		);
	};

	return render();
};

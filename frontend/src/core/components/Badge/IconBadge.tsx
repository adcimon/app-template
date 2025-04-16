import React from 'react';
import { Stack } from '@mui/material';

interface IconBadgeProps {
	icon?: React.ReactElement;
}

export const IconBadge = (props: IconBadgeProps): JSX.Element => {
	const render = () => {
		return (
			<Stack
				direction='row'
				sx={{
					alignItems: 'center',
					backgroundColor: '#d2d6db1f',
					borderRadius: '100%',
					color: 'neutral.light',
					justifyContent: 'center',
					padding: '0.25rem',
				}}>
				{props.icon}
			</Stack>
		);
	};

	return render();
};

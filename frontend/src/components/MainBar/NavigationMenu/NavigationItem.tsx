import React from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface NavigationItemProps {
	label?: string;
	icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	disabled?: boolean;
	onClick?: (event: any) => void;
}

export const NavigationItem = (props: NavigationItemProps): React.JSX.Element => {
	const render = () => {
		return (
			<Chip
				label={<Typography color='primary.contrastText'>{props.label}</Typography>}
				icon={props.icon}
				disabled={props.disabled}
				onClick={props.onClick}
				sx={{
					backgroundColor: 'transparent',
					'& .MuiChip-icon': {
						color: 'primary.contrastText',
					},
					'&:hover': {
						backgroundColor: 'primary.dark',
					},
				}}
			/>
		);
	};

	return render();
};

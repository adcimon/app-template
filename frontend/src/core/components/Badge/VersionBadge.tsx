import React from 'react';
import { Chip, SxProps } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';
import { CopyButton } from '../Button/CopyButton';

interface VersionBadgeProps {
	version?: string;
	color?: string;
	sx?: SxProps;
}

export const VersionBadge = (props: VersionBadgeProps): React.JSX.Element => {
	const color: string = props.color ?? 'text.primary';
	const render = () => {
		return (
			<Chip
				label={props.version}
				icon={
					<SellIcon
						color='inherit'
						sx={{
							fontSize: '1rem',
							transform: 'scaleX(-1)',
						}}
					/>
				}
				deleteIcon={
					<CopyButton
						text={props.version}
						iconColor={color}
						size='small'
						fontSize='1rem'
					/>
				}
				onDelete={() => true}
				sx={{
					...props.sx,
					color: color,
					paddingX: '5px',
					'.MuiChip-label': {
						fontSize: '0.7rem',
						paddingX: '5px',
						userSelect: 'text',
					},
					'.MuiChip-icon': {
						marginLeft: '3px',
						marginRight: '0',
					},
				}}
			/>
		);
	};

	return render();
};

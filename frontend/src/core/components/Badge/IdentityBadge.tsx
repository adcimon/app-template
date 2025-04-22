import React from 'react';
import { Chip } from '@mui/material';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { CopyButton } from '../Button/CopyButton';

interface IdentityBadgeProps {
	id?: string;
	color?: string;
}

export const IdentityBadge = (props: IdentityBadgeProps): React.JSX.Element => {
	const color: string = props.color ?? 'text.primary';
	const render = () => {
		return (
			<Chip
				label={props.id}
				icon={
					<Grid3x3Icon
						color='inherit'
						sx={{
							fontSize: '1rem',
						}}
					/>
				}
				deleteIcon={
					<CopyButton
						text={props.id}
						iconColor={color}
						size='small'
						fontSize='1rem'
					/>
				}
				onDelete={() => true}
				sx={{
					color: color,
					paddingX: '5px',
					'.MuiChip-label': {
						fontSize: '0.7rem',
						paddingX: '3px',
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

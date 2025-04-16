import React from 'react';
import { Chip } from '@mui/material';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { CopyButton } from '../Button/CopyButton';

interface IdBadgeProps {
	id?: string;
}

export const IdBadge = (props: IdBadgeProps): JSX.Element => {
	const render = () => {
		return (
			<Chip
				label={props.id}
				icon={
					<Grid3x3Icon
						sx={{
							fontSize: '1rem',
						}}
					/>
				}
				deleteIcon={
					<CopyButton
						text={props.id}
						size='small'
						fontSize='1rem'
					/>
				}
				onDelete={() => true}
				sx={{
					'.MuiChip-label': {
						fontSize: '0.7rem',
						marginRight: '3px',
						paddingX: '5px',
						userSelect: 'text',
					},
					'.MuiChip-icon': {
						marginLeft: '8px',
						marginRight: '0',
					},
				}}
			/>
		);
	};

	return render();
};

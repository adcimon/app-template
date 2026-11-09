import React from 'react';
import { Chip, SxProps } from '@mui/material';

interface CounterBadgeProps {
	count: number;
	max?: number;
	sx?: SxProps;
}

export const CounterBadge = (props: CounterBadgeProps): React.JSX.Element => {
	const hasMax: boolean = props.max !== undefined && props.max > 0;
	const isFull: boolean = hasMax && props.count >= (props.max as number);
	const render = () => {
		return (
			<Chip
				label={hasMax ? `${props.count} / ${props.max}` : `${props.count}`}
				variant='outlined'
				color={isFull ? 'warning' : 'default'}
				sx={{
					height: '2.25rem',
					...props.sx,
					'.MuiChip-label': {
						fontSize: '1rem',
						paddingX: '16px',
					},
				}}
			/>
		);
	};

	return render();
};

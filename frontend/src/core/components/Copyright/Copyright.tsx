import React from 'react';
import { Link, Typography } from '@mui/material';

export const Copyright = (): JSX.Element => {
	const render = () => {
		const today: Date = new Date();
		const year: number = today.getFullYear();
		return (
			<Typography
				variant='body2'
				sx={{
					color: 'text.secondary',
					textAlign: 'center',
				}}>
				{'Copyright © '}
				<Link
					href='https://www.brainstorm3d.com/'
					target='_blank'
					color='inherit'>
					Brainstorm
				</Link>{' '}
				{year}
			</Typography>
		);
	};

	return render();
};

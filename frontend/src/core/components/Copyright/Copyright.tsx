import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Copyright: React.FC = (): JSX.Element => {
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

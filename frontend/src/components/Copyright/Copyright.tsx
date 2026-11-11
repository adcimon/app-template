import React from 'react';
import { Chip, Link, Stack, Typography } from '@mui/material';
import { AppUtils } from '../../utils/appUtils';

export const Copyright = (): React.JSX.Element => {
	const render = () => {
		const today: Date = new Date();
		const year: number = today.getFullYear();
		return (
			<Stack
				direction='row'
				sx={{
					alignItems: 'center',
					alignSelf: 'center',
					color: 'text.secondary',
					gap: '8px',
				}}>
				<Typography variant='caption'>
					{`© ${year} `}
					<Link
						href='https://github.com/adcimon'
						target='_blank'
						color='inherit'
						underline='hover'>
						adcimon
					</Link>
				</Typography>
				<Chip
					size='small'
					variant='outlined'
					label={`v${AppUtils.getVersion()}`}
					sx={{
						color: 'text.secondary',
						fontFamily: 'monospace',
						fontSize: '11px',
						height: '20px',
					}}
				/>
			</Stack>
		);
	};

	return render();
};

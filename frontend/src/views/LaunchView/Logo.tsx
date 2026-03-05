import React from 'react';
import { Stack, Typography } from '@mui/material';

export const Logo = (): React.JSX.Element => {
	const render = () => {
		return (
			<Stack
				direction='column'
				sx={{
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: '10px',
				}}>
				<Typography
					variant='h3'
					sx={{
						color: '#0170cd',
					}}>
					App Template
				</Typography>
			</Stack>
		);
	};

	return render();
};

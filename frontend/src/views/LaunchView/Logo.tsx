import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Logo = (): JSX.Element => {
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

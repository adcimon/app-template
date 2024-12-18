import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Logo: React.FC = (): JSX.Element => {
	const render = () => {
		return (
			<>
				<Stack
					direction='column'
					sx={{
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: '10px',
					}}>
					<Typography
						component='h2'
						variant='h2'
						sx={{
							color: '#0170cd',
						}}>
						App Template
					</Typography>
				</Stack>
			</>
		);
	};

	return render();
};

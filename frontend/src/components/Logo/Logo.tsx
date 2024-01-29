import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Logo: React.FC = (): JSX.Element => {
	const render = () => {
		return (
			<>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						marginBottom: '10px',
					}}>
					<Typography
						variant='h4'
						color='#0170cd'>
						App Template
					</Typography>
				</Box>
			</>
		);
	};

	return render();
};

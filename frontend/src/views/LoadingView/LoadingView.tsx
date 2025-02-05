import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const LoadingView: React.FC = (): JSX.Element => {
	const render = () => {
		return (
			<>
				<Stack
					direction='column'
					sx={{
						alignItems: 'center',
						height: '100vh',
						justifyContent: 'center',
						width: '100vw',
					}}>
					<Stack
						direction='column'
						sx={{
							alignItems: 'center',
							height: '50%',
							gap: '2rem',
							justifyContent: 'center',
							width: '50%',
						}}>
						<Typography
							sx={{
								color: 'text.secondary',
								fontSize: '2rem',
							}}>
							Loading...
						</Typography>
						<LinearProgress
							sx={{
								width: '100%',
							}}
						/>
					</Stack>
				</Stack>
			</>
		);
	};

	return render();
};

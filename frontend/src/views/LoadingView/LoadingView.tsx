import React from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';

export const LoadingView = (): React.JSX.Element => {
	const render = () => {
		return (
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
						gap: '3rem',
						justifyContent: 'center',
						width: '50%',
					}}>
					<Typography
						sx={{
							color: 'text.secondary',
							fontSize: '3rem',
						}}>
						Loading...
					</Typography>
					<LinearProgress
						sx={{
							width: '70%',
						}}
					/>
				</Stack>
			</Stack>
		);
	};

	return render();
};

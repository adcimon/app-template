import React from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { Window } from './Window';
import { useResponsive } from '../../hooks/useResponsive';

interface LoadingWindowProps {
	text?: string;
}

export const LoadingWindow = (props: LoadingWindowProps): JSX.Element => {
	const responsive: boolean = useResponsive();

	const render = () => {
		return (
			<Window
				open={true}
				sx={{
					height: '100%',
					width: '100%',
				}}>
				<Stack
					direction='column'
					sx={{
						alignItems: 'center',
						height: '100%',
						justifyContent: 'center',
						width: '100%',
					}}>
					<Stack
						direction='column'
						sx={{
							alignItems: 'center',
							height: '50%',
							gap: '2.5rem',
							justifyContent: 'center',
							width: responsive ? '80%' : '50%',
						}}>
						<Typography
							sx={{
								color: 'text.secondary',
								fontSize: responsive ? '2rem' : '2.5rem',
								paddingLeft: responsive ? '1rem' : '',
								paddingRight: responsive ? '1rem' : '',
							}}>
							{props.text || 'Loading...'}
						</Typography>
						<LinearProgress
							sx={{
								width: '100%',
							}}
						/>
					</Stack>
				</Stack>
			</Window>
		);
	};

	return render();
};

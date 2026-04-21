import React from 'react';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { Window } from './Window';
import { useBreakpointDown } from '../../hooks/useBreakpoint';

interface LoadingWindowProps {
	text?: string;
}

export const LoadingWindow = (props: LoadingWindowProps): React.JSX.Element => {
	const isBreakpoint: boolean = useBreakpointDown();

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
							width: isBreakpoint ? '80%' : '50%',
						}}>
						<Typography
							sx={{
								color: 'text.secondary',
								fontSize: isBreakpoint ? '2rem' : '2.5rem',
								paddingLeft: isBreakpoint ? '1rem' : '',
								paddingRight: isBreakpoint ? '1rem' : '',
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

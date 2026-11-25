import React from 'react';
import { Box } from '@mui/material';
import { useBreakpointDown } from '../../core/hooks/useBreakpoint';

export enum LaunchViewMode {
	Split = 'split',
	Full = 'full',
}

interface LaunchViewProps {
	mode?: LaunchViewMode;
	children?: React.ReactNode;
}

export const LaunchView = (props: LaunchViewProps): React.JSX.Element => {
	const isBreakpoint: boolean = useBreakpointDown();

	const mode: LaunchViewMode = isBreakpoint ? LaunchViewMode.Full : (props.mode ?? LaunchViewMode.Split);

	const render = () => {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					minHeight: '100vh',
				}}>
				{mode === LaunchViewMode.Split && (
					<Box
						sx={{
							backgroundColor: 'background.default',
							flex: '0 0 50%',
							height: '100vh',
							overflow: 'hidden',
							position: 'sticky',
							top: 0,
						}}>
						<img
							src='/images/app_banner.jpg'
							style={{
								height: '100%',
								objectFit: 'cover',
								width: '100%',
							}}
						/>
					</Box>
				)}
				<Box
					sx={{
						alignItems: 'center',
						backgroundColor: 'background.paper',
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						padding: { xs: '1.5rem', md: '3rem' },
					}}>
					<Box
						sx={{
							alignItems: 'flex-start',
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
							maxWidth: '420px',
							width: '100%',
							'& > :last-child': {
								alignSelf: 'center',
							},
						}}>
						{props.children}
					</Box>
				</Box>
			</Box>
		);
	};

	return render();
};

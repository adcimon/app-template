import React from 'react';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ErrorIcon } from './ErrorIcon';
import { useResponsive } from '../../core/hooks/useResponsive';

interface ErrorViewProps {
	message?: string;
	onClick?: () => void;
}

export const ErrorView = (props: ErrorViewProps): React.JSX.Element => {
	const responsive: boolean = useResponsive();

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
				<Grid2
					container
					sx={{
						height: '100%',
					}}>
					<Grid2
						size={{
							xs: 12,
							md: 6,
							lg: 6,
						}}
						sx={{
							backgroundColor: '#f1f4f9',
							height: responsive ? '50%' : '100%',
							width: responsive ? '100%' : '50%',
						}}>
						<Stack
							direction='column'
							sx={{
								alignItems: 'center',
								height: '100%',
								justifyContent: 'center',
								width: '100%',
							}}>
							<ErrorIcon />
						</Stack>
					</Grid2>
					<Grid2
						size={{
							xs: 12,
							md: 6,
							lg: 6,
						}}
						sx={{
							height: responsive ? '50%' : '100%',
							width: responsive ? '100%' : '50%',
						}}>
						<Stack
							direction='column'
							spacing={4}
							sx={{
								alignItems: 'center',
								height: '100%',
								justifyContent: 'center',
								paddingX: '1rem',
								width: '100%',
							}}>
							<Stack
								direction='column'
								spacing={1}
								sx={{
									alignItems: 'start',
									justifyContent: 'center',
								}}>
								<Typography
									variant='h3'
									sx={{
										fontWeight: 'bold',
									}}>
									Oops!
								</Typography>
								<Typography
									variant='h6'
									sx={{
										color: 'text.secondary',
									}}>
									{props.message || 'Something went wrong.'}
								</Typography>
							</Stack>
							<Button
								variant='contained'
								onClick={props.onClick}>
								Return Home
							</Button>
						</Stack>
					</Grid2>
				</Grid2>
			</Stack>
		);
	};

	return render();
};

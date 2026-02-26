import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ErrorIcon } from './ErrorIcon';
import { useResponsive } from '../../core/hooks/useResponsive';

interface ErrorViewProps {
	message?: string;
	onClick?: (event: any) => void;
}

export const ErrorView = (props: ErrorViewProps): React.JSX.Element => {
	const responsive: boolean = useResponsive();

	const render = () => {
		return (
			<Stack
				direction={responsive ? 'column' : 'row'}
				sx={{
					alignItems: 'center',
					height: '100vh',
					justifyContent: 'center',
					width: '100vw',
				}}>
				<Stack
					sx={{
						backgroundColor: '#f1f4f9',
						height: responsive ? '40%' : '100%',
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
				</Stack>
				<Stack
					sx={{
						height: responsive ? '60%' : '100%',
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
				</Stack>
			</Stack>
		);
	};

	return render();
};

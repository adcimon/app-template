import React from 'react';
import { Container, Dialog, IconButton, Stack, SxProps, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface WindowProps {
	label?: React.ReactNode;
	open: boolean;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const Window = (props: WindowProps): JSX.Element => {
	const renderHeader = () => {
		return (
			<Stack
				direction='row'
				sx={{
					justifyContent: 'space-between',
					width: '100%',
				}}>
				<Typography variant='h4'>{props.label}</Typography>
				<IconButton
					onClick={props.onClose}
					sx={{
						borderStyle: 'solid',
						borderWidth: '1px',
					}}>
					<CloseIcon />
				</IconButton>
			</Stack>
		);
	};

	const render = () => {
		return (
			<Dialog
				open={props.open}
				closeAfterTransition={true}
				fullScreen={true}
				slotProps={{
					paper: {
						sx: {
							backgroundColor: 'background.default',
						},
					},
				}}>
				<Container
					sx={{
						height: '100%',
						maxWidth: 'lg',
						paddingTop: '2rem',
					}}>
					<Stack
						direction='column'
						spacing={3}
						sx={{
							paddingBottom: '2rem',
							...props.sx,
						}}>
						{(props.label || props.onClose) && renderHeader()}
						{props.children}
					</Stack>
				</Container>
			</Dialog>
		);
	};

	return render();
};

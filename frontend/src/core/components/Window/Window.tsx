import React from 'react';
import { SxProps } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IWindowProps {
	label?: React.ReactNode;
	open: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const Window = (props: IWindowProps): JSX.Element => {
	const handleClose = (event: any) => {
		props.onClose?.(event);
	};

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
					onClick={handleClose}
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

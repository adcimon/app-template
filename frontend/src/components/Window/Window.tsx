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

export const Window: React.FC<IWindowProps> = (props: IWindowProps): JSX.Element => {
	const handleClose = (event: any) => {
		props.onClose?.(event);
	};

	const renderHeader = () => {
		return (
			<>
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
							border: '1px solid',
						}}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</>
		);
	};

	const render = () => {
		return (
			<>
				<Dialog
					open={props.open}
					closeAfterTransition={true}
					fullScreen
					PaperProps={{
						sx: {
							backgroundColor: 'background.default',
						},
					}}>
					<Container
						sx={{
							height: '100%',
							marginBottom: '20px',
							maxWidth: 'lg',
							paddingTop: 3,
						}}>
						<Stack
							direction='column'
							spacing={3}
							sx={props.sx}>
							{renderHeader()}
							{props.children}
						</Stack>
					</Container>
				</Dialog>
			</>
		);
	};

	return render();
};

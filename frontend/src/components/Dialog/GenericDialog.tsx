import React from 'react';
import { SxProps } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import { useResponsive } from '../hooks/useResponsive';

interface IGenericDialogProps {
	title?: React.ReactNode;
	variant?: 'info' | 'success' | 'warning' | 'error';
	actions?: React.ReactNode;
	open: boolean;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const GenericDialog: React.FC<IGenericDialogProps> = (props: IGenericDialogProps): JSX.Element => {
	const responsive: boolean = useResponsive();

	const paperSx: SxProps = responsive
		? {
				borderBottomLeftRadius: '0px',
				borderBottomRightRadius: '0px',
				bottom: '0',
				margin: '0',
				maxWidth: 'none',
				left: '0',
				position: 'absolute',
				width: '100%',
				'& .MuiDialogContent-root': {
					paddingY: '0',
				},
		  }
		: {};

	const renderIcon = () => {
		const sx: SxProps = {
			marginRight: '0.7rem',
			transform: 'scale(1.2)',
		};
		switch (props.variant) {
			case 'info':
				return (
					<InfoIcon
						color='info'
						sx={sx}
					/>
				);
			case 'success':
				return (
					<CheckCircleIcon
						color='success'
						sx={sx}
					/>
				);
			case 'warning':
				return (
					<ErrorRoundedIcon
						color='warning'
						sx={sx}
					/>
				);
			case 'error':
				return (
					<CancelIcon
						color='error'
						sx={sx}
					/>
				);
			default:
				return <></>;
		}
	};

	const render = () => {
		return (
			<>
				<Dialog
					open={props.open}
					closeAfterTransition={true}
					onClose={props.onClose}
					fullWidth={true}
					PaperProps={{
						sx: paperSx,
					}}>
					{props.title && (
						<DialogTitle>
							<Stack
								direction='row'
								sx={{
									alignItems: 'center',
									height: '100%',
									width: '100%',
								}}>
								{renderIcon()}
								{props.title}
							</Stack>
						</DialogTitle>
					)}
					<DialogContent sx={props.sx}>{props.children}</DialogContent>
					{props.actions && <DialogActions>{props.actions}</DialogActions>}
				</Dialog>
			</>
		);
	};

	return render();
};

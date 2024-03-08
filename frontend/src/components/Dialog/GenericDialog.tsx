import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface IGenericDialogProps {
	open: boolean;
	title?: React.ReactNode;
	actions?: React.ReactNode;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const GenericDialog: React.FC<IGenericDialogProps> = (props: IGenericDialogProps): JSX.Element => {
	const theme: Theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.down('md'));

	const paperSx = responsive
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
					padding: '0',
				},
		  }
		: undefined;

	const render = () => {
		return (
			<>
				<Dialog
					open={props.open}
					closeAfterTransition={true}
					onClose={props.onClose}
					fullWidth
					PaperProps={{
						sx: paperSx,
					}}>
					{props.title && <DialogTitle>{props.title}</DialogTitle>}
					<DialogContent sx={props.sx}>{props.children}</DialogContent>
					{props.actions && <DialogActions>{props.actions}</DialogActions>}
				</Dialog>
			</>
		);
	};

	return render();
};

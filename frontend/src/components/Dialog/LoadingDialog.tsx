import * as React from 'react';
import { SxProps } from '@mui/system';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { GenericDialog } from './GenericDialog';

interface ILoadingDialogProps {
	open: boolean;
	title?: React.ReactNode;
	onCancel?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const LoadingDialog: React.FC<ILoadingDialogProps> = (props: ILoadingDialogProps): JSX.Element => {
	const cancelButtonRef = React.useRef<any>(null);

	const handleCancel = async (event: any) => {
		if (props.onCancel) {
			if (cancelButtonRef.current) {
				cancelButtonRef.current.disabled = true;
			}
			await props.onCancel(event);
			if (cancelButtonRef.current) {
				cancelButtonRef.current.disabled = false;
			}
		}
	};

	const handleClose = () => {
		return;
	};

	const render = () => {
		return (
			<>
				<GenericDialog
					open={props.open}
					title={props.title}
					actions={
						<>
							<Button
								ref={cancelButtonRef}
								onClick={handleCancel}>
								Cancel
							</Button>
						</>
					}
					onClose={handleClose}
					sx={props.sx}>
					<Stack
						direction='row'
						gap={2}
						sx={{
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<CircularProgress size='5rem' />
					</Stack>
					{props.children}
				</GenericDialog>
			</>
		);
	};

	return render();
};

import React from 'react';
import { Button, CircularProgress, Stack, SxProps } from '@mui/material';
import { GenericDialog } from './GenericDialog';

interface LoadingDialogProps {
	title?: React.ReactNode;
	open: boolean;
	onCancel?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const LoadingDialog = (props: LoadingDialogProps): JSX.Element => {
	const cancelButtonRef = React.useRef<any>(null);

	const handleCancel = async (event: any) => {
		if (!props.onCancel) {
			return;
		}

		if (cancelButtonRef.current) {
			cancelButtonRef.current.disabled = true;
		}

		await props.onCancel(event);

		if (cancelButtonRef.current) {
			cancelButtonRef.current.disabled = false;
		}
	};

	const handleClose = () => {
		return;
	};

	const render = () => {
		return (
			<GenericDialog
				title={props.title}
				actions={
					<>
						{props.onCancel && (
							<Button
								ref={cancelButtonRef}
								onClick={handleCancel}>
								Cancel
							</Button>
						)}
					</>
				}
				open={props.open}
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
		);
	};

	return render();
};

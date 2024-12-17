import React from 'react';
import { SxProps } from '@mui/system';
import Button from '@mui/material/Button';
import { GenericDialog } from './GenericDialog';

interface IConfirmationDialogProps {
	open: boolean;
	variant?: 'info' | 'success' | 'warning' | 'error';
	title?: React.ReactNode;
	acceptable?: boolean;
	onAccept?: (event: any) => void;
	onCancel?: (event: any) => void;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const ConfirmationDialog: React.FC<IConfirmationDialogProps> = (
	props: IConfirmationDialogProps,
): JSX.Element => {
	const acceptButtonRef = React.useRef<any>(null);
	const cancelButtonRef = React.useRef<any>(null);

	const handleAccept = async (event: any) => {
		if (!props.onAccept) {
			return;
		}

		if (acceptButtonRef.current) {
			acceptButtonRef.current.disabled = true;
		}

		await props.onAccept(event);

		if (acceptButtonRef.current) {
			acceptButtonRef.current.disabled = false;
		}
	};

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

	const render = () => {
		const acceptable: boolean =
			props.acceptable === undefined || props.acceptable === null ? true : props.acceptable;
		return (
			<>
				<GenericDialog
					open={props.open}
					variant={props.variant}
					title={props.title}
					actions={
						<>
							<Button
								ref={cancelButtonRef}
								onClick={handleCancel}>
								Cancel
							</Button>
							<Button
								ref={acceptButtonRef}
								disabled={!acceptable}
								autoFocus
								onClick={handleAccept}>
								Accept
							</Button>
						</>
					}
					onClose={props.onClose}
					sx={props.sx}>
					{props.children}
				</GenericDialog>
			</>
		);
	};

	return render();
};

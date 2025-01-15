import React from 'react';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CopyField } from '../Field/CopyField';
import { GenericDialog } from './GenericDialog';
const QRCode = require('qrcode');

interface IShareDialogProps {
	label?: string;
	text?: string;
	open: boolean;
	showQR?: boolean;
	onAccept?: (event: any) => void;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const ShareDialog: React.FC<IShareDialogProps> = (props: IShareDialogProps): JSX.Element => {
	const copyFieldRef = React.useRef<any>(null);
	const canvasRef = React.useRef<any>(null);
	const acceptButtonRef = React.useRef<any>(null);

	React.useEffect(() => {
		setTimeout(() => {
			copyFieldRef.current?.focus();
			if (props.showQR) {
				generateQR();
			}
		}, 100);
	}, [props.text]);

	const generateQR = () => {
		if (!canvasRef.current || !props.text) {
			return;
		}

		QRCode.toCanvas(canvasRef.current, props.text, (error: any) => {
			if (error) {
				console.log(error);
			}
		});
	};

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

	const render = () => {
		return (
			<>
				<GenericDialog
					title={
						<>
							<Stack
								direction='row'
								spacing={1}
								sx={{
									alignItems: 'center',
									marginY: '5px',
								}}>
								<IconButton
									disableRipple
									sx={{
										backgroundColor: 'primary.main',
										transform: 'scale(0.9)',
									}}>
									<ShareIcon
										sx={{
											color: 'white',
										}}
									/>
								</IconButton>
								<Typography variant='h5'>Share</Typography>
							</Stack>
						</>
					}
					actions={
						<>
							{props.onAccept && (
								<Button
									ref={acceptButtonRef}
									autoFocus={true}
									onClick={handleAccept}>
									Accept
								</Button>
							)}
						</>
					}
					open={props.open}
					onClose={props.onClose}
					sx={props.sx}>
					<Stack
						direction='column'
						spacing={3}
						sx={{
							marginTop: '5px',
						}}>
						<CopyField
							inputRef={copyFieldRef}
							label={props.label}
							value={props.text}
							onFocus={(event: any) => event.target.select()}
							fullWidth={true}
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						{props.showQR && (
							<Stack
								direction='column'
								sx={{
									alignItems: 'center',
								}}>
								<Box
									sx={{
										height: '200px',
										width: '200px',
									}}>
									<canvas
										ref={canvasRef}
										style={{
											maxHeight: '100%',
											maxWidth: '100%',
										}}
									/>
								</Box>
							</Stack>
						)}
					</Stack>
				</GenericDialog>
			</>
		);
	};

	return render();
};

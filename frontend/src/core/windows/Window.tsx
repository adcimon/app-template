import React from 'react';
import * as MUI from '@mui/material';
import { Box, Breakpoint, Container, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputIcon from '@mui/icons-material/Input';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { windowsController } from './windowsController';
import { Dialog } from '../components/Dialog/Dialog';
import { WindowPortal } from './WindowPortal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useWindow } from './useWindow';

export enum WindowMode {
	Inline = 'inline',
	Dialog = 'dialog',
	Overlay = 'overlay',
	Portal = 'portal',
}

interface WindowProps {
	id?: string;
	mode: WindowMode;
	dockable?: boolean;
	open?: boolean;
	title?: string;
	icon?: React.ReactNode;
	height?: string;
	maxWidth?: Breakpoint;
	onClose?: (event: any) => void;
	children?: React.ReactNode;
}

export const Window = (props: WindowProps): React.JSX.Element => {
	const handle = useWindow(props.id);

	const canUndock: boolean = useMediaQuery('(hover: hover) and (pointer: fine)');

	const mode: WindowMode = handle?.state.undocked ? WindowMode.Portal : props.mode;

	const open: boolean = handle ? handle.state.open : (props.open ?? true);
	const onClose = handle ? handle.close : props.onClose;

	const height: string = props.height ?? (mode === WindowMode.Dialog ? '500px' : '100%');

	React.useEffect(() => {
		if (!props.id) {
			return;
		}

		const id: string = props.id;
		windowsController.register(id, props.title, props.icon, (props.dockable ?? false) && canUndock);
		return () => windowsController.unregister(id);
	}, [props.id]);

	const handleOpen = (nativeWindow: Window) => {
		if (props.id) {
			windowsController.setNativeWindow(props.id, nativeWindow);
		}
	};

	const handleBlocked = () => {
		if (props.id) {
			windowsController.undockBlocked(props.id);
		} else {
			onClose?.(undefined);
		}
	};

	const renderUndock = () => {
		if (!handle || handle.state.undocked || !handle.state.dockable) {
			return <></>;
		}

		return (
			<Tooltip title='Undock'>
				<IconButton
					size='small'
					onClick={handle.undock}
					sx={{
						color: 'text.primary',
						padding: '9px',
					}}>
					<OpenInNewIcon fontSize='small' />
				</IconButton>
			</Tooltip>
		);
	};

	const renderDock = () => {
		if (!handle?.state.undocked) {
			return <></>;
		}

		return (
			<Tooltip title='Dock'>
				<IconButton
					size='small'
					onClick={handle.dock}
					sx={{
						color: 'text.primary',
						padding: '9px',
					}}>
					<InputIcon fontSize='small' />
				</IconButton>
			</Tooltip>
		);
	};

	const renderClose = () => {
		if (!onClose) {
			return <></>;
		}

		return (
			<Tooltip title='Close'>
				<IconButton
					size='small'
					onClick={onClose}
					sx={{
						color: 'text.primary',
						padding: '9px',
					}}>
					<CloseIcon fontSize='small' />
				</IconButton>
			</Tooltip>
		);
	};

	const renderHeader = () => {
		return (
			<Box>
				<Stack
					direction='row'
					sx={{
						alignItems: 'center',
						justifyContent: 'space-between',
						minHeight: '40px',
						padding: '1rem',
					}}>
					<Stack
						direction='row'
						sx={{
							alignItems: 'center',
							gap: '0.5rem',
							minWidth: 0,
							paddingX: '1rem',
						}}>
						{props.icon}
						<Typography
							noWrap={true}
							sx={{
								fontSize: '1rem',
								fontWeight: 'bold',
							}}>
							{props.title}
						</Typography>
					</Stack>
					<Stack
						direction='row'
						sx={{
							alignItems: 'center',
						}}>
						{renderUndock()}
						{renderDock()}
						{renderClose()}
					</Stack>
				</Stack>
				<Divider />
			</Box>
		);
	};

	const renderBody = () => {
		return (
			<Box
				sx={{
					flexGrow: 1,
					minHeight: 0,
					overflow: 'auto',
					padding: props.maxWidth ? '1.5rem 0' : '1rem',
				}}>
				{props.maxWidth ? <Container maxWidth={props.maxWidth}>{props.children}</Container> : props.children}
			</Box>
		);
	};

	const renderContent = () => {
		return (
			<Stack
				sx={{
					height: height,
					width: '100%',
				}}>
				{props.title && renderHeader()}
				{renderBody()}
			</Stack>
		);
	};

	const renderDialog = () => {
		return (
			<Dialog
				open={open}
				onClose={onClose}
				sx={{
					marginBottom: '2rem',
					padding: 0,
				}}>
				{renderContent()}
			</Dialog>
		);
	};

	const renderOverlay = () => {
		return (
			<MUI.Dialog
				open={open}
				closeAfterTransition={true}
				fullScreen={true}
				slotProps={{
					paper: {
						sx: {
							backgroundColor: 'background.default',
						},
					},
				}}>
				{renderContent()}
			</MUI.Dialog>
		);
	};

	const renderPortal = () => {
		if (!open) {
			return <></>;
		}

		return (
			<WindowPortal
				title={props.title}
				onOpen={handleOpen}
				onClose={onClose}
				onBlocked={handleBlocked}>
				{renderContent()}
			</WindowPortal>
		);
	};

	const render = () => {
		switch (mode) {
			case WindowMode.Inline:
				return open ? renderContent() : <></>;
			case WindowMode.Dialog:
				return renderDialog();
			case WindowMode.Overlay:
				return renderOverlay();
			case WindowMode.Portal:
				return renderPortal();
			default:
				return <></>;
		}
	};

	return render();
};

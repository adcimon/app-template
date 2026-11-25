import React from 'react';
import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import InputIcon from '@mui/icons-material/Input';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { windowsController } from '../../../core/windows/windowsController';
import { MenuButton } from '../../../core/components/Button/MenuButton';
import { Popover } from '../../../core/components/Popover/Popover';
import { WindowHandle } from '../../../core/windows/windowHandle';
import { useWindows } from '../../../core/windows/useWindows';

export const WindowsMenu = (): React.JSX.Element => {
	const ref = React.useRef<any>(null);

	const windows: WindowHandle[] = useWindows().filter((handle: WindowHandle) => handle.state.open);
	const dockedWindows: WindowHandle[] = windows.filter((handle: WindowHandle) => !handle.state.undocked);
	const undockedWindows: WindowHandle[] = windows.filter((handle: WindowHandle) => handle.state.undocked);

	const [open, setOpen] = React.useState<boolean>(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleFocus = (handle: WindowHandle) => {
		handle.focus();
		setOpen(false);
	};

	const handleDockAll = () => {
		undockedWindows.forEach((handle: WindowHandle) => handle.dock());
	};

	const handleCloseAll = () => {
		windowsController.closeAll();
		setOpen(false);
	};

	const renderUndock = (handle: WindowHandle) => {
		if (handle.state.undocked || !handle.state.dockable) {
			return <></>;
		}

		return (
			<Tooltip title='Undock'>
				<IconButton
					size='small'
					onClick={handle.undock}>
					<OpenInNewIcon fontSize='small' />
				</IconButton>
			</Tooltip>
		);
	};

	const renderDock = (handle: WindowHandle) => {
		if (!handle.state.undocked) {
			return <></>;
		}

		return (
			<Tooltip title='Dock'>
				<IconButton
					size='small'
					onClick={handle.dock}>
					<InputIcon fontSize='small' />
				</IconButton>
			</Tooltip>
		);
	};

	const renderItem = (handle: WindowHandle) => {
		return (
			<Stack
				key={handle.state.id}
				direction='row'
				onClick={handle.state.undocked ? () => handleFocus(handle) : undefined}
				sx={{
					alignItems: 'center',
					borderRadius: '8px',
					cursor: handle.state.undocked ? 'pointer' : 'default',
					gap: '0.75rem',
					minHeight: '40px',
					paddingX: '0.5rem',
					'&:hover': {
						backgroundColor: 'action.hover',
					},
				}}>
				{handle.state.icon}
				<Typography
					noWrap={true}
					sx={{
						flexGrow: 1,
					}}>
					{handle.state.title}
				</Typography>
				<Stack
					direction='row'
					onClick={(event: React.MouseEvent) => event.stopPropagation()}>
					{renderUndock(handle)}
					{renderDock(handle)}
					<Tooltip title='Close'>
						<IconButton
							size='small'
							onClick={handle.close}>
							<CloseIcon fontSize='small' />
						</IconButton>
					</Tooltip>
				</Stack>
			</Stack>
		);
	};

	const renderSection = (title: string, handles: WindowHandle[]) => {
		if (handles.length === 0) {
			return <></>;
		}

		return (
			<Stack>
				<Typography
					variant='caption'
					sx={{
						alignItems: 'center',
						color: 'text.secondary',
						display: 'flex',
						minHeight: '32px',
						paddingX: '0.5rem',
					}}>
					{title}
				</Typography>
				{handles.map(renderItem)}
			</Stack>
		);
	};

	const renderEmpty = () => {
		return (
			<Typography
				variant='body2'
				sx={{
					color: 'text.secondary',
					paddingX: '0.5rem',
					paddingY: '0.5rem',
				}}>
				No open windows
			</Typography>
		);
	};

	const render = () => {
		return (
			<>
				<MenuButton
					ref={ref}
					color='inherit'
					tooltip='Windows'
					icon={<DynamicFeedIcon />}
					active={open}
					onClick={handleClick}
				/>
				<Popover
					title={
						<Typography
							noWrap={true}
							sx={{
								fontWeight: 'bold',
							}}>
							Windows
						</Typography>
					}
					anchorEl={ref}
					open={open}
					onClose={handleClose}
					sx={{
						width: '300px',
					}}>
					<Divider />
					<Stack
						sx={{
							gap: '0.5rem',
							padding: '0.5rem',
						}}>
						{windows.length === 0 && renderEmpty()}
						{renderSection('Docked', dockedWindows)}
						{renderSection('Undocked', undockedWindows)}
					</Stack>
					{windows.length > 0 && (
						<>
							<Divider />
							<Stack
								direction='row'
								sx={{
									justifyContent: 'flex-end',
									padding: '0.5rem',
								}}>
								<Box
									sx={{
										display: 'grid',
										gap: '0.5rem',
										gridTemplateColumns: '1fr 1fr',
										width: '100%',
									}}>
									{undockedWindows.length > 0 && (
										<Button
											variant='outlined'
											size='small'
											color='inherit'
											startIcon={<InputIcon />}
											onClick={handleDockAll}
											sx={{
												fontSize: '0.75rem',
												paddingX: '8px',
												paddingY: '2px',
												whiteSpace: 'nowrap',
												'& .MuiButton-startIcon': {
													marginRight: '4px',
												},
												'& .MuiButton-startIcon > svg': {
													fontSize: '16px',
												},
											}}>
											Dock all
										</Button>
									)}
									<Button
										variant='outlined'
										size='small'
										color='inherit'
										startIcon={<CloseIcon />}
										onClick={handleCloseAll}
										sx={{
											fontSize: '0.75rem',
											gridColumn: 2,
											paddingX: '8px',
											paddingY: '2px',
											whiteSpace: 'nowrap',
											'& .MuiButton-startIcon': {
												marginRight: '4px',
											},
											'& .MuiButton-startIcon > svg': {
												fontSize: '16px',
											},
										}}>
										Close all
									</Button>
								</Box>
							</Stack>
						</>
					)}
				</Popover>
			</>
		);
	};

	return render();
};

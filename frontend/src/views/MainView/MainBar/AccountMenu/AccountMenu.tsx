import React from 'react';
import toast from 'react-hot-toast';
import { SxProps } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ExitToApp from '@mui/icons-material/ExitToApp';
import HelpIcon from '@mui/icons-material/Help';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { GenericPopover } from '../../../../core/components/Popover/GenericPopover';
import { HelpWindow } from '../../Windows/HelpWindow/HelpWindow';
import { ManagementWindow } from '../../Windows/ManagementWindow/ManagementWindow';
import { SettingsWindow } from '../../Windows/SettingsWindow/SettingsWindow';
import { useAppState } from '../../../../states/app/useAppState';
import { useUserState } from '../../../../states/user/useUserState';
import { AppUtils } from '../../../../utils/appUtils';

export const AccountMenu: React.FC = (): JSX.Element => {
	const ref = React.useRef<any>(null);

	const appState = useAppState();
	const userState = useUserState();

	const [open, setOpen] = React.useState<boolean>(false);
	const [openSettingsWindow, setOpenSettingsWindow] = React.useState<boolean>(false);
	const [openManagementWindow, setOpenManagementWindow] = React.useState<boolean>(false);
	const [openHelpWindow, setOpenHelpWindow] = React.useState<boolean>(false);
	const [openSignOutDialog, setOpenSignOutDialog] = React.useState<boolean>(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSettings = () => {
		setOpen(false);
		setOpenSettingsWindow(true);
	};

	const handleCloseSettings = () => {
		setOpenSettingsWindow(false);
	};

	const handleManagement = () => {
		setOpen(false);
		setOpenManagementWindow(true);
	};

	const handleCloseManagement = () => {
		setOpenManagementWindow(false);
	};

	const handleHelp = () => {
		setOpen(false);
		setOpenHelpWindow(true);
	};

	const handleCloseHelp = () => {
		setOpenHelpWindow(false);
	};

	const handleSignOut = () => {
		setOpen(false);
		setOpenSignOutDialog(true);
	};

	const handleAcceptSignOut = async () => {
		try {
			await appState.signOut();
		} catch (error: any) {
			// Ignore errors.
		} finally {
			toast.success('See you soon!');
			appState.reset();
			userState.reset();
		}
	};

	const handleCancelSignOut = () => {
		setOpen(false);
		setOpenSignOutDialog(false);
	};

	const render = () => {
		const avatar: string | undefined = AppUtils.getAvatar(userState.user);
		const iconSx: SxProps = {
			paddingRight: '5px',
		};
		return (
			<>
				<Chip
					label={
						<Typography
							variant='body2'
							color='primary.contrastText'
							noWrap={true}
							sx={{
								fontSize: '0.75rem',
								maxWidth: '80px',
							}}>
							{userState.user?.name || <Skeleton width={50} />}
						</Typography>
					}
					avatar={
						<Avatar
							ref={ref}
							src={avatar}
							sx={{
								backgroundColor: 'white',
								boxShadow: '0px 0px 5px 0px #444',
								transform: 'translateX(-12px)',
							}}
						/>
					}
					onClick={handleClick}
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'space-between',
						marginLeft: '20px',
						marginRight: '10px',
						transform: 'scale(1.3)',
						'& .MuiChip-label': {
							order: 1,
						},
						'& .MuiChip-avatar': {
							order: 2,
						},
						'&:hover': {
							backgroundColor: 'primary.dark',
						},
					}}
				/>
				<GenericPopover
					anchorEl={ref}
					open={open}
					onClose={handleClose}
					sx={{
						backgroundImage: 'url("/images/blur_cyan.png"), url("/images/blur_red.png") !important',
						backgroundPosition: 'right top, left bottom',
						backgroundRepeat: 'no-repeat, no-repeat',
						backgroundSize: '50% 50%',
						width: '200px',
					}}>
					<Box
						sx={{
							paddingX: 2,
							paddingY: 1.5,
						}}>
						<Typography
							variant='body1'
							sx={{
								fontWeight: 'bold',
							}}>
							{userState.user?.name || <Skeleton width={150} />}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							noWrap={true}>
							{userState.user?.email || <Skeleton width={150} />}
						</Typography>
					</Box>
					<Divider />
					<MenuList
						disablePadding
						dense
						sx={{
							padding: '5px',
							paddingBottom: '10px',
						}}>
						<MenuItem onClick={handleSettings}>
							<SettingsIcon sx={iconSx} />
							<Typography>Settings</Typography>
						</MenuItem>
						{userState.user?.isAdmin() && (
							<MenuItem onClick={handleManagement}>
								<SecurityIcon sx={iconSx} />
								<Typography>Management</Typography>
							</MenuItem>
						)}
						<MenuItem onClick={handleHelp}>
							<HelpIcon sx={iconSx} />
							<Typography>Help</Typography>
						</MenuItem>
						<MenuItem
							onClick={handleSignOut}
							sx={{
								'& .MuiSvgIcon-root': {
									color: 'error.dark',
								},
								'& .MuiTypography-root': {
									color: 'error.dark',
								},
								'&:hover': {
									backgroundColor: 'error.dark',
									'& .MuiSvgIcon-root': {
										color: 'error.contrastText',
									},
									'& .MuiTypography-root': {
										color: 'error.contrastText',
									},
								},
							}}>
							<ExitToApp sx={iconSx} />
							<Typography>Sign Out</Typography>
						</MenuItem>
					</MenuList>
				</GenericPopover>
				<SettingsWindow
					open={openSettingsWindow}
					onClose={handleCloseSettings}
				/>
				<ManagementWindow
					open={openManagementWindow}
					onClose={handleCloseManagement}
				/>
				<HelpWindow
					open={openHelpWindow}
					onClose={handleCloseHelp}
				/>
				<ConfirmationDialog
					title='Sign Out'
					open={openSignOutDialog}
					onAccept={handleAcceptSignOut}
					onCancel={handleCancelSignOut}
					onClose={handleCancelSignOut}>
					<Typography>Do you want to sign out?</Typography>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

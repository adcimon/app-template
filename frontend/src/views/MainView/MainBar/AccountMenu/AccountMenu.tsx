import React from 'react';
import toast from 'react-hot-toast';
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
import { ConfirmationDialog } from '../../../../components/Dialog/ConfirmationDialog';
import { GenericPopover } from '../../../../components/Popover/GenericPopover';
import { HelpWindow } from '../../Windows/HelpWindow/HelpWindow';
import { ManagementWindow } from '../../Windows/ManagementWindow/ManagementWindow';
import { SettingsWindow } from '../../Windows/SettingsWindow/SettingsWindow';
import { useAppState } from '../../../../states/hooks/useAppState';
import { useUserState } from '../../../../states/hooks/useUserState';
import { Utils } from '../../../../utils/utils';

interface IAccountMenuState {
	open: boolean;
	openSettingsWindow: boolean;
	openManagementWindow: boolean;
	openHelpWindow: boolean;
	openSignOutDialog: boolean;
}

export const AccountMenu: React.FC = (): JSX.Element => {
	const appState = useAppState();
	const userState = useUserState();

	const [state, setState] = React.useState<IAccountMenuState>({
		open: false,
		openSettingsWindow: false,
		openManagementWindow: false,
		openHelpWindow: false,
		openSignOutDialog: false,
	});

	const ref = React.useRef<any>(null);

	const handleClick = () => {
		setState({
			...state,
			open: !state.open,
		});
	};

	const handleClose = () => {
		setState({
			...state,
			open: false,
		});
	};

	const handleSettings = () => {
		setState({
			...state,
			open: false,
			openSettingsWindow: true,
		});
	};

	const handleCloseSettings = () => {
		setState({
			...state,
			openSettingsWindow: false,
		});
	};

	const handleManagement = () => {
		setState({
			...state,
			open: false,
			openManagementWindow: true,
		});
	};

	const handleCloseManagement = () => {
		setState({
			...state,
			openManagementWindow: false,
		});
	};

	const handleHelp = () => {
		setState({
			...state,
			open: false,
			openHelpWindow: true,
		});
	};

	const handleCloseHelp = () => {
		setState({
			...state,
			openHelpWindow: false,
		});
	};

	const handleSignOut = () => {
		setState({
			...state,
			open: false,
			openSignOutDialog: true,
		});
	};

	const handleAcceptSignOut = async () => {
		try {
			await appState.signOut();
		} catch (error: any) {
			// Ignore errors.
		} finally {
			toast.success('See you soon!');
			appState.reset();
		}
	};

	const handleCancelSignOut = () => {
		setState({
			...state,
			open: false,
			openSignOutDialog: false,
		});
	};

	const render = () => {
		const avatar: string | undefined = Utils.getAvatar(userState.user);
		return (
			<>
				<Chip
					label={
						<Typography
							noWrap
							variant='body2'
							color='primary.contrastText'
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
					open={state.open}
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
							noWrap
							color='text.secondary'
							variant='body2'>
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
							<SettingsIcon
								sx={{
									paddingRight: '5px',
								}}
							/>
							<Typography>Settings</Typography>
						</MenuItem>
						{userState.user?.isAdmin() && (
							<MenuItem onClick={handleManagement}>
								<SecurityIcon
									sx={{
										paddingRight: '5px',
									}}
								/>
								<Typography>Management</Typography>
							</MenuItem>
						)}
						<MenuItem onClick={handleHelp}>
							<HelpIcon
								sx={{
									paddingRight: '5px',
								}}
							/>
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
							<ExitToApp
								sx={{
									paddingRight: '5px',
								}}
							/>
							<Typography>Sign Out</Typography>
						</MenuItem>
					</MenuList>
				</GenericPopover>
				<SettingsWindow
					open={state.openSettingsWindow}
					onClose={handleCloseSettings}
				/>
				<ManagementWindow
					open={state.openManagementWindow}
					onClose={handleCloseManagement}
				/>
				<HelpWindow
					open={state.openHelpWindow}
					onClose={handleCloseHelp}
				/>
				<ConfirmationDialog
					open={state.openSignOutDialog}
					title='Sign Out'
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

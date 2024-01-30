import * as React from 'react';
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
import { ConfirmationDialog } from '../../../Dialog/ConfirmationDialog';
import { GenericPopover } from '../../../Popover/GenericPopover';
import { HelpView } from './HelpView/HelpView';
import { ManagementView } from './ManagementView/ManagementView';
import { SettingsView } from './SettingsView/SettingsView';
import { AppStateType, resetAppState } from '../../../../states/AppState';
import { Utils } from '../../../../utils/utils';

interface IAccountMenuProps {
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface IAccountMenuState {
	open: boolean;
	openSettings: boolean;
	openManagement: boolean;
	openHelp: boolean;
	openSignOutDialog: boolean;
}

export const AccountMenu: React.FC<IAccountMenuProps> = (props: IAccountMenuProps): JSX.Element => {
	const [state, setState] = React.useState<IAccountMenuState>({
		open: false,
		openSettings: false,
		openManagement: false,
		openHelp: false,
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
			openSettings: true,
		});
	};

	const handleCloseSettings = () => {
		setState({
			...state,
			openSettings: false,
		});
	};

	const handleManagement = () => {
		setState({
			...state,
			open: false,
			openManagement: true,
		});
	};

	const handleCloseManagement = () => {
		setState({
			...state,
			openManagement: false,
		});
	};

	const handleHelp = () => {
		setState({
			...state,
			open: false,
			openHelp: true,
		});
	};

	const handleCloseHelp = () => {
		setState({
			...state,
			openHelp: false,
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
			await props.appState.backendClient?.signOut();
		} catch (error: any) {
			// Ignore errors.
		} finally {
			props.setAppState(resetAppState(props.appState));
			toast.success('See you soon!');
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
		const avatar: string = props.appState.user
			? props.appState.user.avatar === ''
				? Utils.getPlaceholderAvatar(props.appState.user)
				: props.appState.user.avatar
			: undefined;
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
							{props.appState.user.name || <Skeleton width={50} />}
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
							{props.appState.user.name || <Skeleton width={150} />}
						</Typography>
						<Typography
							noWrap
							color='text.secondary'
							variant='body2'>
							{props.appState.user.email || <Skeleton width={150} />}
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
						<MenuItem onClick={handleManagement}>
							<SecurityIcon
								sx={{
									paddingRight: '5px',
								}}
							/>
							<Typography>Management</Typography>
						</MenuItem>
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
				<SettingsView
					open={state.openSettings}
					onClose={handleCloseSettings}
					appState={props.appState}
					setAppState={props.setAppState}
				/>
				<ManagementView
					open={state.openManagement}
					onClose={handleCloseManagement}
					appState={props.appState}
					setAppState={props.setAppState}
				/>
				<HelpView
					open={state.openHelp}
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

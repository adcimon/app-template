import * as React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { PreferencesView } from './PreferencesView/PreferencesView';
import { ProfileView } from './ProfileView/ProfileView';
import { UserAvatar } from './UserAvatar/UserAvatar';
import { Window } from '../../../../Window/Window';
import { AppStateType } from '../../../../../states/AppState';
import { Utils } from '../../../../../utils/utils';

interface ISettingsViewProps {
	open: boolean;
	onClose?: (event: any) => void;
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

interface ISettingsViewState {
	tab: number;
}

export const SettingsView: React.FC<ISettingsViewProps> = (props: ISettingsViewProps): JSX.Element => {
	const [state, setState] = React.useState<ISettingsViewState>({
		tab: 0,
	});

	const handleTabChange = (event: any, value: number) => {
		setState({
			...state,
			tab: value,
		});
	};

	const handleClose = (event: any) => {
		setState({
			...state,
			tab: 0,
		});

		if (props.onClose) {
			props.onClose(event);
		}
	};

	const renderHeader = () => {
		const id: string =
			props.appState.user.name && props.appState.user.name !== ''
				? `${props.appState.user.name} ${props.appState.user.surname}`
				: props.appState.user.email;
		return (
			<>
				<Card>
					<Box
						sx={{
							backgroundAttachment: 'scroll scroll',
							backgroundClip: 'border-box border-box',
							backgroundImage:
								'linear-gradient(rgba(0, 79, 225, 0.8), rgba(1, 41, 114, 0.8)), url("/images/user_banner.jpg")',
							backgroundOrigin: 'padding-box, padding-box',
							backgroundPosition: 'center center',
							backgroundSize: 'cover',
							height: '290px',
							position: 'relative',
						}}>
						<Stack
							direction='row'
							spacing={3}
							sx={{
								bottom: '-180px',
								left: '32px',
								position: 'relative',
								zIndex: '10',
							}}>
							<UserAvatar
								appState={props.appState}
								setAppState={props.setAppState}
							/>
							<Stack
								direction='column'
								sx={{
									justifyContent: 'center',
								}}>
								<Typography
									gutterBottom
									variant='h5'
									sx={{
										color: 'white',
									}}>
									{id}
								</Typography>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex',
									}}>
									<Typography
										noWrap
										variant='body2'
										sx={{
											color: '#919eab',
											width: '50%',
										}}>
										{props.appState.user.id}
									</Typography>
									<IconButton
										size='small'
										onClick={() => Utils.copyToClipboard(props.appState.user.id)}>
										<ContentCopyIcon
											fontSize='inherit'
											sx={{
												color: 'white',
											}}
										/>
									</IconButton>
								</Box>
							</Stack>
						</Stack>
					</Box>
					<Stack
						direction='row'
						sx={{
							justifyContent: 'flex-end',
							paddingX: '20px',
							width: '100%',
						}}>
						<Tabs
							value={state.tab}
							onChange={handleTabChange}
							variant='scrollable'
							scrollButtons={true}
							allowScrollButtonsMobile>
							<Tab
								label={
									<>
										<Stack
											direction='row'
											spacing={0.5}>
											<AccountBoxIcon />
											<Typography>Profile</Typography>
										</Stack>
									</>
								}
							/>
							<Tab
								label={
									<>
										<Stack
											direction='row'
											spacing={0.5}>
											<SettingsSuggestIcon />
											<Typography>Preferences</Typography>
										</Stack>
									</>
								}
							/>
						</Tabs>
					</Stack>
				</Card>
			</>
		);
	};

	const renderTab = () => {
		return (
			<>
				{state.tab === 0 && (
					<ProfileView
						appState={props.appState}
						setAppState={props.setAppState}
					/>
				)}
				{state.tab === 1 && (
					<PreferencesView
						appState={props.appState}
						setAppState={props.setAppState}
					/>
				)}
			</>
		);
	};

	const render = () => {
		return (
			<>
				<Window
					label='Settings'
					open={props.open}
					onClose={handleClose}>
					{renderHeader()}
					{renderTab()}
				</Window>
			</>
		);
	};

	return render();
};

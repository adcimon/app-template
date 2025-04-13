import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { CopyButton } from '../../../../core/components/Button/CopyButton';
import { IconBadge } from '../../../../core/components/Badge/IconBadge';
import { PreferencesView } from './PreferencesView/PreferencesView';
import { ProfileView } from './ProfileView/ProfileView';
import { UserAvatar } from './UserAvatar/UserAvatar';
import { Window } from '../../../../core/components/Window/Window';
import { useResponsive } from '../../../../core/hooks/useResponsive';
import { useUserState } from '../../../../states/user/useUserState';

interface ISettingsWindowProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const SettingsWindow = (props: ISettingsWindowProps): JSX.Element => {
	const headerHeight: string = '290px';
	const responsiveHeaderHeight: string = '190px';
	const avatarPosition: string = '-180px';
	const responsiveAvatarPosition: string = '-30px';

	const responsive: boolean = useResponsive();

	const userState = useUserState();

	const [tab, setTab] = React.useState<number>(0);

	const getId = (): string => {
		if (userState.user?.name && userState.user?.name !== '') {
			return `${userState.user.name} ${userState.user.surname}`;
		}

		if (userState.user?.email) {
			return userState.user.email;
		}

		return '';
	};

	const handleTabChange = (event: any, value: number) => {
		setTab(value);
	};

	const handleClose = (event: any) => {
		setTab(0);
		props.onClose?.(event);
	};

	const renderHeader = () => {
		const id: string = getId();
		return (
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
						height: responsive ? responsiveHeaderHeight : headerHeight,
						position: 'relative',
					}}>
					<Stack
						direction='row'
						spacing={3}
						sx={{
							bottom: responsive ? responsiveAvatarPosition : avatarPosition,
							left: '32px',
							position: 'relative',
							zIndex: '10',
						}}>
						<UserAvatar />
						<Stack
							direction='column'
							sx={{
								justifyContent: 'center',
							}}>
							<Typography
								variant='h5'
								gutterBottom
								sx={{
									color: 'white',
								}}>
								{id}
							</Typography>
							<Stack
								direction='row'
								sx={{
									alignItems: 'center',
								}}>
								<IconBadge
									icon={
										<Grid3x3Icon
											sx={{
												fontSize: '1rem',
											}}
										/>
									}
								/>
								<Typography
									variant='body2'
									noWrap={true}
									sx={{
										color: '#919eab',
										fontSize: '0.8rem',
										width: '50%',
									}}>
									{userState.user?.id}
								</Typography>
								<CopyButton
									text={userState.user?.id}
									size='small'
								/>
							</Stack>
						</Stack>
					</Stack>
				</Box>
				<Stack
					direction='row'
					sx={{
						justifyContent: responsive ? 'flex-start' : 'flex-end',
						width: '100%',
					}}>
					<Tabs
						variant='scrollable'
						value={tab}
						onChange={handleTabChange}
						scrollButtons
						allowScrollButtonsMobile>
						<Tab
							label={
								<Stack
									direction='row'
									spacing={0.5}>
									<AccountBoxIcon />
									<Typography>Profile</Typography>
								</Stack>
							}
						/>
						<Tab
							label={
								<Stack
									direction='row'
									spacing={0.5}>
									<SettingsSuggestIcon />
									<Typography>Preferences</Typography>
								</Stack>
							}
						/>
					</Tabs>
				</Stack>
			</Card>
		);
	};

	const renderTab = () => {
		switch (tab) {
			case 0:
				return <ProfileView />;
			case 1:
				return <PreferencesView />;
			default:
				return <></>;
		}
	};

	const render = () => {
		return (
			<Window
				label='Settings'
				open={props.open}
				onClose={handleClose}>
				{renderHeader()}
				{renderTab()}
			</Window>
		);
	};

	return render();
};

import React from 'react';
import { Box, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { IdentityBadge } from '../../../core/components/Badge/IdentityBadge';
import { PreferencesMenu } from './PreferencesMenu/PreferencesMenu';
import { ProfileMenu } from './ProfileMenu/ProfileMenu';
import { UserAvatar } from './UserAvatar/UserAvatar';
import { Window } from '../../../core/components/Window/Window';
import { useBreakpointDown } from '../../../core/hooks/useBreakpoint';
import { useUserState } from '../../../states/user/useUserState';

interface SettingsWindowProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const SettingsWindow = (props: SettingsWindowProps): React.JSX.Element => {
	const headerHeight = {
		md: '190px',
		lg: '290px',
	};

	const avatarPosition = {
		md: '-30px',
		lg: '-180px',
	};

	const isBreakpoint: boolean = useBreakpointDown();

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
						height: isBreakpoint ? headerHeight.md : headerHeight.lg,
						position: 'relative',
					}}>
					<Stack
						direction='row'
						spacing={3}
						sx={{
							bottom: isBreakpoint ? avatarPosition.md : avatarPosition.lg,
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
								gutterBottom={true}
								sx={{
									color: 'white',
								}}>
								{id}
							</Typography>
							{userState.user?.id && (
								<IdentityBadge
									id={userState.user?.id}
									color='neutral.light'
								/>
							)}
						</Stack>
					</Stack>
				</Box>
				<Stack
					direction='row'
					sx={{
						justifyContent: isBreakpoint ? 'flex-start' : 'flex-end',
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
				return <ProfileMenu />;
			case 1:
				return <PreferencesMenu />;
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

import React from 'react';
import { Avatar, Box, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { LocaleSelect } from '../../../../core/components/Select/LocaleSelect';
import { Table } from '../../../../core/components/Table/Table';
import { TimezoneSelect } from '../../../../core/components/Select/TimezoneSelect';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { User } from '../../../../model/api/user';
import { useAdminState } from '../../../../states/admin/useAdminState';
import { AppUtils } from '../../../../utils/appUtils';

export const UsersMenu = (): React.JSX.Element => {
	const adminState = useAdminState();

	const [user, setUser] = React.useState<User>();

	React.useEffect(() => {
		getUsers();
	}, []);

	const resetState = () => {
		setUser(undefined);
	};

	const getUsers = async () => {
		try {
			await adminState.getUsers();
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const handleSelect = (item: User) => {
		setUser(item);
	};

	const handleDeselect = () => {
		resetState();
	};

	const renderRow = (item: User) => {
		const avatar: string | undefined = AppUtils.getAvatar(item);
		return [
			<>
				{/* Name */}
				<Stack
					direction='row'
					spacing={2}
					sx={{
						alignItems: 'center',
					}}>
					<Avatar
						src={avatar}
						sx={{
							backgroundColor: 'neutral.light',
						}}
					/>
					<Box>
						<Typography variant='subtitle2'>
							{item.name} {item?.surname}
						</Typography>
						<Typography
							variant='body2'
							noWrap={true}
							sx={{
								color: 'text.secondary',
								fontSize: '0.75rem',
								marginTop: '5px',
							}}>
							{item.id}
						</Typography>
					</Box>
				</Stack>
			</>,
			<>
				{/* Email */}
				<Stack
					direction='row'
					spacing={0.5}>
					<Typography variant='body2'>{item.email}</Typography>
					<VerificationBadge verified={item.emailVerified} />
				</Stack>
			</>,
			<>
				{/* Phone */}
				{item.phone && (
					<Stack
						direction='row'
						spacing={0.5}>
						<Typography variant='body2'>{item.phone}</Typography>
						<VerificationBadge verified={item.phoneVerified} />
					</Stack>
				)}
				{!item.phone && (
					<Typography
						variant='body2'
						sx={{
							fontSize: 'small',
						}}>
						-
					</Typography>
				)}
			</>,
		];
	};

	const renderDialog = () => {
		const avatar: string | undefined = AppUtils.getAvatar(user);
		return (
			<>
				<Stack
					direction='row'
					spacing={2}
					sx={{
						alignItems: 'center',
					}}>
					<Avatar
						src={avatar}
						sx={{
							backgroundColor: 'neutral.light',
							height: '64px',
							width: '64px',
						}}
					/>
					<Box>
						<Typography variant='h5'>
							{user?.name} {user?.surname}
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: 'text.secondary',
								fontSize: '0.75rem',
								marginTop: '5px',
							}}>
							{user?.id}
						</Typography>
					</Box>
				</Stack>
				<TextField
					label='Email'
					value={user?.email ?? ''}
					disabled={true}
					fullWidth={true}
					slotProps={{
						input: {
							readOnly: true,
							startAdornment: (
								<InputAdornment position='start'>
									<VerificationBadge verified={user?.emailVerified} />
								</InputAdornment>
							),
						},
						inputLabel: {
							shrink: true,
						},
					}}
				/>
				<TextField
					label='Phone'
					value={user?.phone ?? ''}
					disabled={true}
					fullWidth={true}
					slotProps={{
						input: {
							readOnly: true,
							startAdornment: (
								<InputAdornment position='start'>
									<VerificationBadge verified={user?.phoneVerified} />
								</InputAdornment>
							),
						},
						inputLabel: {
							shrink: true,
						},
					}}
				/>
				<TextField
					label='Birthdate'
					type='date'
					value={user?.birthdate ?? ''}
					disabled={true}
					fullWidth={true}
					slotProps={{
						input: {
							readOnly: true,
						},
						inputLabel: {
							shrink: true,
						},
					}}
				/>
				<LocaleSelect
					label='Locale'
					value={user?.locale ?? ''}
					disabled={true}
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
				/>
				<TimezoneSelect
					label='Timezone'
					value={user?.timezone ?? ''}
					disabled={true}
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
				/>
			</>
		);
	};

	const render = () => {
		return (
			<Container maxWidth='xl'>
				<Table<User>
					head={['Name', 'Email', 'Phone']}
					itemName='User'
					items={adminState.users}
					renderRow={renderRow}
					renderDialog={renderDialog}
					onSelect={handleSelect}
					onDeselect={handleDeselect}
				/>
			</Container>
		);
	};

	return render();
};

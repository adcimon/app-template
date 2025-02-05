import React from 'react';
import toast from 'react-hot-toast';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CountrySelect } from '../../../../core/components/Select/CountrySelect';
import { GenericTable } from '../../../../core/components/Table/GenericTable';
import { TimezoneSelect } from '../../../../core/components/Select/TimezoneSelect';
import { VerificationBadge } from '../../../../core/components/Badge/VerificationBadge';
import { useAdminState } from '../../../../states/admin/useAdminState';
import { AppUtils } from '../../../../utils/appUtils';

export const UsersView: React.FC = (): JSX.Element => {
	const adminState = useAdminState();

	const [user, setUser] = React.useState<any>();

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
			toast.error(error.message);
		}
	};

	const handleSelect = (item: any) => {
		setUser(item);
	};

	const handleDeselect = () => {
		resetState();
	};

	const renderRow = (item: any) => {
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
					<>
						<Stack
							direction='row'
							spacing={0.5}>
							<Typography variant='body2'>{item.phone}</Typography>
							<VerificationBadge verified={item.phoneVerified} />
						</Stack>
					</>
				)}
				{!item.phone && (
					<>
						<Typography
							variant='body2'
							sx={{
								fontSize: 'small',
							}}>
							-
						</Typography>
					</>
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
					defaultValue={user?.email}
					disabled
					fullWidth={true}
					InputProps={{
						readOnly: true,
						startAdornment: (
							<InputAdornment position='start'>
								<VerificationBadge verified={user?.emailVerified} />
							</InputAdornment>
						),
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					label='Phone'
					defaultValue={user?.phone}
					disabled
					fullWidth={true}
					InputProps={{
						readOnly: true,
						startAdornment: (
							<InputAdornment position='start'>
								<VerificationBadge verified={user?.phoneVerified} />
							</InputAdornment>
						),
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					label='Birthdate'
					type='date'
					defaultValue={user?.birthdate}
					disabled
					fullWidth={true}
					InputProps={{
						readOnly: true,
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<CountrySelect
					label='Country'
					defaultValue={user?.country}
					disabled
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TimezoneSelect
					label='Timezone'
					defaultValue={user?.timezone}
					disabled
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</>
		);
	};

	const render = () => {
		return (
			<>
				<Container maxWidth='xl'>
					<GenericTable
						itemName='User'
						items={adminState.users}
						head={['Name', 'Email', 'Phone']}
						row={renderRow}
						dialog={renderDialog()}
						onSelect={handleSelect}
						onDeselect={handleDeselect}
					/>
				</Container>
			</>
		);
	};

	return render();
};

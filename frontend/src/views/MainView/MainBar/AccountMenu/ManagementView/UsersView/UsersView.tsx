import * as React from 'react';
import toast from 'react-hot-toast';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CountrySelect } from '../../../../../../components/Select/CountrySelect';
import { GenericTable } from '../../../../../../components/Table/GenericTable';
import { TimezoneSelect } from '../../../../../../components/Select/TimezoneSelect';
import { VerificationBadge } from '../../../../../../components/Badge/VerificationBadge';
import { AppStateType } from '../../../../../../states/AppState';
import { Utils } from '../../../../../../utils/utils';

interface IUsersViewProps {
	appState: AppStateType;
}

interface IUsersViewState {
	users: any[];
	user: any;
}

export const UsersView: React.FC<IUsersViewProps> = (props: IUsersViewProps): JSX.Element => {
	const [state, setState] = React.useState<IUsersViewState>({
		users: [],
		user: null,
	});

	React.useEffect(() => {
		getUsers();
	}, []);

	const resetState = () => {
		setState({
			...state,
			user: null,
		});
	};

	const getUsers = async () => {
		try {
			const users: any = await props.appState.apiClient?.usersService.getUsers();
			setState({
				...state,
				users: users,
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleSelect = (item: any) => {
		setState({
			...state,
			user: item,
		});
	};

	const handleDeselect = () => {
		resetState();
	};

	const renderRow = (item: any) => {
		const avatar: string = item ? (item.avatar === '' ? Utils.getPlaceholderAvatar(item) : item.avatar) : undefined;
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
							noWrap
							variant='body2'
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
		const avatar: string = state.user
			? state.user.avatar === ''
				? Utils.getPlaceholderAvatar(state.user)
				: state.user.avatar
			: undefined;
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
							{state?.user?.name} {state?.user?.surname}
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: 'text.secondary',
								fontSize: '0.75rem',
								marginTop: '5px',
							}}>
							{state?.user?.id}
						</Typography>
					</Box>
				</Stack>
				<TextField
					label='Email'
					defaultValue={state?.user?.email}
					disabled
					fullWidth
					InputProps={{
						readOnly: true,
						startAdornment: (
							<InputAdornment position='start'>
								<VerificationBadge verified={state?.user?.emailVerified} />
							</InputAdornment>
						),
					}}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					label='Phone'
					defaultValue={state?.user?.phone}
					disabled
					fullWidth
					InputProps={{
						readOnly: true,
						startAdornment: (
							<InputAdornment position='start'>
								<VerificationBadge verified={state?.user?.phoneVerified} />
							</InputAdornment>
						),
					}}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					label='Birthdate'
					type='date'
					defaultValue={state?.user?.birthdate}
					disabled
					fullWidth
					InputProps={{ readOnly: true }}
					InputLabelProps={{ shrink: true }}
				/>
				<CountrySelect
					label='Country'
					defaultValue={state?.user?.country}
					disabled
					InputLabelProps={{ shrink: true }}
				/>
				<TimezoneSelect
					label='Timezone'
					defaultValue={state?.user?.timezone}
					disabled
					InputLabelProps={{ shrink: true }}
				/>
			</>
		);
	};

	const render = () => {
		return (
			<>
				<Container maxWidth='xl'>
					<GenericTable
						items={state.users}
						head={() => ['Name', 'Email', 'Phone']}
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

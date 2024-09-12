import * as React from 'react';
import toast from 'react-hot-toast';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../../../../../../components/Dialog/ConfirmationDialog';
import { useAppState } from '../../../../../../hooks/useAppState';
import { Utils } from '../../../../../../utils/utils';

interface IUserAvatarState {
	showOverlay: boolean;
	openDialog: boolean;
	avatar: string;
}

export const UserAvatar: React.FC = (): JSX.Element => {
	const { appState, setAppState } = useAppState();

	const [state, setState] = React.useState<IUserAvatarState>({
		showOverlay: false,
		openDialog: false,
		avatar: '',
	});

	const ref = React.useRef<HTMLDivElement>(null);

	const handleMouseEnter = () => {
		setState({
			...state,
			showOverlay: true,
		});
	};

	const handleMouseLeave = () => {
		setState({
			...state,
			showOverlay: false,
		});
	};

	const handleClick = () => {
		setState({
			...state,
			openDialog: true,
			avatar: appState?.user?.avatar || '',
		});
	};

	const validate = (): boolean => {
		return Utils.AVATAR_REGEXP.test(state.avatar) && state.avatar !== appState.user.avatar;
	};

	const handleAccept = async () => {
		const update = async () => {
			try {
				const user: any = await appState.apiClient?.usersService.updateMyAvatar(state.avatar);
				setAppState({
					...appState,
					user: user,
				});
				setState({
					...state,
					openDialog: false,
				});
				toast.success('Avatar changed');
			} catch (error: any) {
				toast.error(error.message);
			}
		};

		if (state.avatar === '') {
			update();
			return;
		}

		fetch(state.avatar, { method: 'GET', mode: 'no-cors' })
			.then((response: any) => {
				console.log(response);
				update();
			})
			.catch(() => {
				toast.error('Invalid URL');
			});
	};

	const handleCancel = () => {
		setState({
			...state,
			openDialog: false,
		});
	};

	const render = () => {
		const avatar: string | undefined = Utils.getAvatar(appState.user);
		return (
			<>
				<Box
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					sx={{
						position: 'relative',
					}}>
					<Avatar
						ref={ref}
						src={avatar}
						sx={{
							backgroundColor: 'neutral.light',
							border: '2px solid white',
							height: '128px',
							width: '128px',
						}}
					/>
					<Stack
						sx={{
							alignItems: 'center',
							cursor: 'pointer',
							height: '128px',
							justifyContent: 'center',
							left: '0',
							opacity: !state.showOverlay ? '0' : '1',
							position: 'absolute',
							transition: 'all 0.2s',
							top: '0',
							visibility: !state.showOverlay ? 'hidden' : 'visible',
							width: '128px',
						}}>
						<Box
							sx={{
								backgroundColor: 'neutral.dark',
								border: '1px solid grey',
								borderRadius: '100%',
								height: '100%',
								left: '0',
								opacity: '0.8',
								position: 'absolute',
								top: '0',
								width: '100%',
							}}
						/>
						<IconButton
							onClick={handleClick}
							sx={{
								zIndex: '1',
							}}>
							<AddAPhotoIcon
								fontSize='inherit'
								sx={{
									color: 'neutral.light',
									fontSize: '2.5rem',
								}}
							/>
						</IconButton>
					</Stack>
				</Box>
				<ConfirmationDialog
					open={state.openDialog}
					title='Change Avatar'
					acceptable={validate()}
					onAccept={handleAccept}
					onCancel={handleCancel}
					onClose={handleCancel}>
					<Typography>Insert your avatar URL.</Typography>
					<TextField
						value={state.avatar}
						onChange={(event: any) => setState({ ...state, avatar: event.target.value })}
						helperText='Supported formats: jpg, jpeg and png.'
						autoFocus
						fullWidth
						margin='dense'
						variant='standard'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

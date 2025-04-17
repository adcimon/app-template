import React from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { ConfirmationDialog } from '../../../../core/components/Dialog/ConfirmationDialog';
import { useUserState } from '../../../../states/user/useUserState';
import { AppUtils } from '../../../../utils/appUtils';

export const UserAvatar = (): React.JSX.Element => {
	const ref = React.useRef<HTMLDivElement>(null);

	const userState = useUserState();

	const [avatar, setAvatar] = React.useState<string>('');
	const [showOverlay, setShowOverlay] = React.useState<boolean>(false);
	const [openDialog, setOpenDialog] = React.useState<boolean>(false);

	const handleMouseEnter = () => {
		setShowOverlay(true);
	};

	const handleMouseLeave = () => {
		setShowOverlay(false);
	};

	const handleClick = () => {
		setAvatar(userState.user?.avatar || '');
		setOpenDialog(true);
	};

	const validate = (): boolean => {
		return AppUtils.AVATAR_REGEXP.test(avatar) && avatar !== userState.user?.avatar;
	};

	const handleAccept = async () => {
		const update = async () => {
			try {
				await userState.updateAvatar(avatar);
				setOpenDialog(false);
				ToastManager.success('Avatar changed');
			} catch (error: any) {
				ToastManager.error(error.message);
			}
		};

		if (avatar === '') {
			update();
			return;
		}

		fetch(avatar, { method: 'GET', mode: 'no-cors' })
			.then((response: any) => {
				console.log(response);
				update();
			})
			.catch(() => {
				ToastManager.error('Invalid URL');
			});
	};

	const handleCancel = () => {
		setOpenDialog(false);
	};

	const render = () => {
		const avatar: string | undefined = AppUtils.getAvatar(userState.user);
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
							opacity: !showOverlay ? '0' : '1',
							position: 'absolute',
							transition: 'all 0.2s',
							top: '0',
							visibility: !showOverlay ? 'hidden' : 'visible',
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
					title='Change Avatar'
					open={openDialog}
					acceptable={validate()}
					onAccept={handleAccept}
					onCancel={handleCancel}
					onClose={handleCancel}>
					<Typography>Insert your avatar URL.</Typography>
					<TextField
						variant='standard'
						value={avatar}
						helperText='Supported formats: jpg, jpeg and png.'
						autoFocus={true}
						onChange={(event: any) => setAvatar(event.target.value)}
						fullWidth={true}
						margin='dense'
					/>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};

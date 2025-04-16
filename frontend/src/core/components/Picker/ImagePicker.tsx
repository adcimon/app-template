import React from 'react';
import { SxProps } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import { Utils } from '../../utils/utils';

interface ImagePickerProps {
	src?: string;
	accept?: string;
	icon?: 'image' | 'user';
	onChange?: (file: File) => void;
	onDelete?: () => void;
}

export const ImagePicker = (props: ImagePickerProps): JSX.Element => {
	const ref = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [showOverlay, setShowOverlay] = React.useState<boolean>(false);
	const [src, setSrc] = React.useState<string>('');

	const handleMouseEnter = () => {
		setShowOverlay(true);
	};

	const handleMouseLeave = () => {
		setShowOverlay(false);
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		inputRef?.current?.click();
	};

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files: FileList | null = event.target.files;
		if (!files) {
			return;
		}

		const file: File = files[0];
		const src: string = await Utils.readImage(file);
		setSrc(src);

		props.onChange?.(file);
	};

	const handleDelete = () => {
		setSrc('');
		props.onDelete?.();
	};

	const renderIcon = () => {
		const iconSx: SxProps = {
			color: 'neutral.dark',
			height: '60%',
			width: '60%',
		};
		switch (props.icon) {
			case 'image':
				return <ImageIcon sx={iconSx} />;
			case 'user':
				return <PersonIcon sx={iconSx} />;
			default:
				return <ImageIcon sx={iconSx} />;
		}
	};

	const render = () => {
		return (
			<Box
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				sx={{
					position: 'relative',
				}}>
				<Avatar
					ref={ref}
					src={src || props.src}
					sx={{
						backgroundColor: 'neutral.light',
						border: '2px solid white',
						height: '128px',
						width: '128px',
					}}>
					{renderIcon()}
				</Avatar>
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
					<input
						ref={inputRef}
						type='file'
						accept={props.accept || '.jpg,.png'}
						onChange={handleChange}
						hidden
					/>
					<IconButton
						onClick={handleClick}
						sx={{
							zIndex: '1',
						}}>
						<EditIcon
							fontSize='inherit'
							sx={{
								color: 'neutral.light',
								fontSize: '2.5rem',
							}}
						/>
					</IconButton>
					{props.onDelete && (
						<IconButton
							size='small'
							onClick={handleDelete}
							sx={{
								backgroundColor: 'error.dark',
								bottom: '0',
								position: 'absolute',
								right: '0',
								'&:hover': {
									backgroundColor: 'error.main',
								},
							}}>
							<DeleteIcon fontSize='inherit' />
						</IconButton>
					)}
				</Stack>
			</Box>
		);
	};

	return render();
};

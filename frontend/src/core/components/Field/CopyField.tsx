import React from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps, Zoom } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Utils } from '../../utils/utils';

export const CopyField = (props: TextFieldProps): React.JSX.Element => {
	const [success, setSuccess] = React.useState<boolean>(false);

	const handleClick = () => {
		const value: string = (props.value as any) || (props.defaultValue as any);
		Utils.copyToClipboard(value);

		setSuccess(true);

		setTimeout(() => {
			setSuccess(false);
		}, 3000);
	};

	const render = () => {
		return (
			<TextField
				{...props}
				label={props.label || 'Text'}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='end'>
								<>
									{!success && <IconButton onClick={handleClick}>{<ContentCopyIcon />}</IconButton>}
									{success && (
										<Zoom in={success}>
											<IconButton disableRipple={true}>
												<TaskAltIcon color='success' />
											</IconButton>
										</Zoom>
									)}
								</>
							</InputAdornment>
						),
					},
				}}
			/>
		);
	};

	return render();
};

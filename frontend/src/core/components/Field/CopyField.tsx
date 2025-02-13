import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import { Utils } from '../../utils/utils';

export const CopyField: React.FC<TextFieldProps> = (props: TextFieldProps): JSX.Element => {
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
			<>
				<TextField
					{...props}
					label={props.label || 'Text'}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<>
										{!success && (
											<IconButton onClick={handleClick}>{<ContentCopyIcon />}</IconButton>
										)}
										{success && (
											<Zoom in={success}>
												<IconButton disableRipple>
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
			</>
		);
	};

	return render();
};

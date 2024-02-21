import * as React from 'react';
import Zoom from '@mui/material/Zoom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Utils } from '../../utils/utils';

interface ICopyFieldState {
	success: boolean;
}

export const CopyField: React.FC<TextFieldProps> = (props: TextFieldProps): JSX.Element => {
	const [state, setState] = React.useState<ICopyFieldState>({
		success: false,
	});

	const handleClick = () => {
		const value: string = (props.value as any) || (props.defaultValue as any);
		Utils.copyToClipboard(value);

		setState({
			...state,
			success: true,
		});

		setTimeout(() => {
			setState({
				...state,
				success: false,
			});
		}, 3000);
	};

	const render = () => {
		return (
			<>
				<TextField
					inputRef={props.inputRef}
					label={props.label || 'Text'}
					placeholder={props.placeholder}
					type={props.type}
					value={props.value}
					onChange={props.onChange}
					onFocus={props.onFocus}
					helperText={props.helperText}
					disabled={props.disabled}
					required={props.required}
					autoFocus={props.autoFocus}
					fullWidth={props.fullWidth}
					margin={props.margin}
					variant={props.variant}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<>
									{!state.success && (
										<IconButton onClick={handleClick}>{<ContentCopyIcon />}</IconButton>
									)}
									{state.success && (
										<Zoom in={state.success}>
											<IconButton disableRipple>
												<TaskAltIcon color='success' />
											</IconButton>
										</Zoom>
									)}
								</>
							</InputAdornment>
						),
					}}
				/>
			</>
		);
	};

	return render();
};

import * as React from 'react';
import Fab from '@mui/material/Fab';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const SendField: React.FC<TextFieldProps> = (props: TextFieldProps): JSX.Element => {
	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter') {
			props.onClick?.(event);
		}
	};

	const render = () => {
		return (
			<>
				<TextField
					inputRef={props.inputRef}
					placeholder={props.placeholder}
					type='text'
					value={props.value}
					onChange={props.onChange}
					onFocus={props.onFocus}
					onKeyDown={handleKeyPress}
					helperText={props.helperText}
					disabled={props.disabled}
					required={props.required}
					autoFocus={props.autoFocus}
					fullWidth={props.fullWidth}
					margin={props.margin}
					variant='filled'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<Fab
									onClick={(event: any) => props.onClick?.(event)}
									size='small'
									color='primary'
									sx={{
										transform: 'scale(0.9)',
									}}>
									<SendIcon
										sx={{
											transform: 'translateX(2px)',
										}}
									/>
								</Fab>
							</InputAdornment>
						),
						inputProps: {
							style: {
								paddingBottom: '15px',
								paddingTop: '15px',
							},
						},
					}}
					sx={props.sx}
				/>
			</>
		);
	};

	return render();
};

import React from 'react';
import Fab from '@mui/material/Fab';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type SendFieldProps = TextFieldProps & {
	onSend?: () => void;
};

export const SendField = ({ onSend, ...props }: SendFieldProps): JSX.Element => {
	const handleKeyDown = (event: any) => {
		props.onKeyDown?.(event);

		if (event.key === 'Enter') {
			onSend?.();
		}
	};

	const render = () => {
		return (
			<>
				<TextField
					{...props}
					type='text'
					variant='filled'
					onKeyUp={handleKeyDown}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<Fab
										color='primary'
										size='small'
										onClick={() => onSend?.()}
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
						},
					}}
				/>
			</>
		);
	};

	return render();
};

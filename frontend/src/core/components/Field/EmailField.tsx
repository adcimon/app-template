import React from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export const EmailField = (props: TextFieldProps): React.JSX.Element => {
	const render = () => {
		return (
			<TextField
				{...props}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position='start'>
								<EmailIcon fontSize='small' />
							</InputAdornment>
						),
					},
				}}
			/>
		);
	};

	return render();
};

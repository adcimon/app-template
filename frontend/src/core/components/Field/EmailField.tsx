import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const EmailField: React.FC<TextFieldProps> = (props: TextFieldProps): JSX.Element => {
	const render = () => {
		return (
			<>
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
			</>
		);
	};

	return render();
};

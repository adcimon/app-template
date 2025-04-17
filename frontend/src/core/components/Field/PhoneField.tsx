import React from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

export const PhoneField = (props: TextFieldProps): React.JSX.Element => {
	const render = () => {
		return (
			<TextField
				{...props}
				type='tel'
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position='start'>
								<PhoneIcon fontSize='small' />
							</InputAdornment>
						),
					},
				}}
			/>
		);
	};

	return render();
};

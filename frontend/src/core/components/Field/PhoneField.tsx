import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const PhoneField = (props: TextFieldProps): JSX.Element => {
	const render = () => {
		return (
			<>
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
			</>
		);
	};

	return render();
};

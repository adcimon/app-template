import React from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { CopyButton } from '../Button/CopyButton';

export const CopyField = (props: TextFieldProps): React.JSX.Element => {
	const render = () => {
		const value: string = (props.value as any) || (props.defaultValue as any);
		return (
			<TextField
				{...props}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='end'>
								<CopyButton text={value} />
							</InputAdornment>
						),
					},
				}}
			/>
		);
	};

	return render();
};

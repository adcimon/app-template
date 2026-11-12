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
					...props.slotProps,
					input: {
						...(props.slotProps?.input as object),
						endAdornment: (
							<InputAdornment position='end'>
								<CopyButton
									text={value}
									disabled={!value}
								/>
							</InputAdornment>
						),
					},
				}}
			/>
		);
	};

	return render();
};

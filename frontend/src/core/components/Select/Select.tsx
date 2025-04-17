import React from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';

export type SelectProps<T> = TextFieldProps & {
	options?: T[];
	renderValue?: (value: T) => React.JSX.Element;
};

export const Select = <T,>({ options, renderValue, ...props }: SelectProps<T>): React.JSX.Element => {
	const render = () => {
		return (
			<TextField
				{...props}
				select={true}
				hiddenLabel={!props.label}>
				{props.children ? props.children : undefined}
				{!props.children &&
					options?.map((value: T, index: number) => (
						<MenuItem
							key={index}
							value={typeof value === 'number' ? value : value?.toString()}
							sx={{
								margin: '2px',
							}}>
							{renderValue?.(value) ?? value?.toString()}
						</MenuItem>
					))}
			</TextField>
		);
	};

	return render();
};

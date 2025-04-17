import React from 'react';
import { Chip, MenuItem, Stack, TextField, TextFieldProps } from '@mui/material';

export type MultipleSelectProps<T> = TextFieldProps & {
	options?: T[];
	renderValue?: (value: T) => React.JSX.Element;
};

export const MultipleSelect = <T,>({ options, renderValue, ...props }: MultipleSelectProps<T>): React.JSX.Element => {
	const [editable, setEditable] = React.useState<boolean>(true);

	React.useEffect(() => {
		setEditable(true);
	}, [props.value]);

	const handleChange = (event: any) => {
		if (editable && props.onChange) {
			props.onChange(event);
			setEditable(false);
		}
	};

	const render = () => {
		const sortedValue: T[] = (props.value as any)
			?.slice()
			.sort((v1: T, v2: T) => (options ? options.indexOf(v1) - options.indexOf(v2) : 0));
		return (
			<TextField
				{...props}
				select={true}
				hiddenLabel={!props.label}
				slotProps={{
					inputLabel: {
						shrink: true,
					},
					select: {
						multiple: true,
						value: sortedValue,
						onChange: handleChange,
						renderValue: (value: any) => {
							return (
								<Stack
									direction='row'
									sx={{
										alignItems: 'center',
										gap: '0.25rem',
									}}>
									{value?.map((v: T, i: number) => (
										<Chip
											key={i}
											label={renderValue?.(v) ?? v?.toString()}
										/>
									))}
								</Stack>
							);
						},
					},
				}}>
				{options?.map((value: T, index: number) => (
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

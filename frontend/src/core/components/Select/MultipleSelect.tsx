import React from 'react';
import { Chip, MenuItem, Stack, SxProps, TextField } from '@mui/material';

interface MultipleSelectProps {
	label?: React.ReactNode;
	helperText?: React.ReactNode;
	options?: string[];
	values?: string[];
	onChange?: (values: string[]) => void;
	renderValue?: (value: string) => void;
	sx?: SxProps;
}

export const MultipleSelect = (props: MultipleSelectProps): JSX.Element => {
	const [editable, setEditable] = React.useState<boolean>(true);

	React.useEffect(() => {
		setEditable(true);
	}, [props.values]);

	const handleChange = (event: any) => {
		const values: string[] = event.target.value;
		if (editable && props.onChange) {
			props.onChange(values);
			setEditable(false);
		}
	};

	const render = () => {
		const sortedValues: string[] =
			props.values
				?.slice()
				.sort((v1: string, v2: string) =>
					props.options ? props.options.indexOf(v1) - props.options.indexOf(v2) : 0,
				) ?? [];
		return (
			<TextField
				label={props.label}
				helperText={props.helperText}
				select={true}
				slotProps={{
					inputLabel: {
						shrink: true,
					},
					select: {
						multiple: true,
						value: sortedValues,
						onChange: handleChange,
						renderValue: (values: any) => {
							return (
								<Stack
									direction='row'
									sx={{
										alignItems: 'center',
										gap: '0.25rem',
									}}>
									{values.map((value: string, index: number) => (
										<Chip
											key={index}
											label={props.renderValue?.(value) ?? value}
										/>
									))}
								</Stack>
							);
						},
					},
				}}
				sx={props.sx}>
				{props.options?.map((value: string, index: number) => (
					<MenuItem
						key={index}
						value={value}
						sx={{
							margin: '2px',
						}}>
						{props.renderValue?.(value) ?? value}
					</MenuItem>
				))}
			</TextField>
		);
	};

	return render();
};

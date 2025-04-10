import React from 'react';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

interface IGenericSwitchProps {
	label?: React.ReactNode;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export const GenericSwitch = (props: IGenericSwitchProps): JSX.Element => {
	const render = () => {
		return (
			<Stack
				direction='row'
				sx={{
					alignItems: 'center',
				}}>
				<Typography
					sx={{
						fontSize: '0.9rem',
						transform: 'translateY(-3px)',
					}}>
					{props.label}
				</Typography>
				<Switch
					checked={props.checked}
					onChange={(event: any, checked: boolean) => props.onChange?.(checked)}
				/>
			</Stack>
		);
	};

	return render();
};

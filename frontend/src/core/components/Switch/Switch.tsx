import React from 'react';
import { Stack, Switch, Typography } from '@mui/material';

interface GenericSwitchProps {
	label?: React.ReactNode;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export const GenericSwitch = (props: GenericSwitchProps): JSX.Element => {
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

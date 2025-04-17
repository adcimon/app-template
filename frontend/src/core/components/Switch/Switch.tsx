import React from 'react';
import * as MUI from '@mui/material';
import { Stack, Typography } from '@mui/material';

interface SwitchProps {
	label?: React.ReactNode;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export const Switch = (props: SwitchProps): React.JSX.Element => {
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
				<MUI.Switch
					checked={props.checked}
					onChange={(event: any, checked: boolean) => props.onChange?.(checked)}
				/>
			</Stack>
		);
	};

	return render();
};

import React from 'react';
import * as MUI from '@mui/material';
import { Stack, Typography } from '@mui/material';

type SwitchProps = MUI.SwitchProps & {
	label?: React.ReactNode;
};

export const Switch = ({ label, ...props }: SwitchProps): React.JSX.Element => {
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
					{label}
				</Typography>
				<MUI.Switch {...props} />
			</Stack>
		);
	};

	return render();
};

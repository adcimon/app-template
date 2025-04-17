import React from 'react';
import { Checkbox, CheckboxProps, SxProps } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

type PinToggleProps = CheckboxProps & {
	pinned?: boolean;
	iconColor?: string;
	onChange?: (event: any, pinned: boolean) => void;
};

export const PinToggle = ({ pinned, iconColor, onChange, ...props }: PinToggleProps): React.JSX.Element => {
	const render = () => {
		const iconSx: SxProps = {
			color: iconColor ?? 'text.primary',
		};
		return (
			<Checkbox
				{...props}
				checked={pinned}
				icon={<PushPinOutlinedIcon sx={iconSx} />}
				checkedIcon={<PushPinIcon sx={iconSx} />}
				onChange={(event: any, checked: boolean) => onChange?.(event, checked)}
			/>
		);
	};

	return render();
};

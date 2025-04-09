import React from 'react';
import { SxProps } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

interface IPinButtonProps {
	pinned?: boolean;
	size?: 'small' | 'medium' | 'large';
	onChange?: (pinned: boolean) => void;
}

export const PinButton = (props: IPinButtonProps): JSX.Element => {
	const render = () => {
		const iconSx: SxProps = {
			color: 'text.primary',
		};
		return (
			<Checkbox
				checked={props.pinned}
				size={props.size}
				icon={<PushPinOutlinedIcon sx={iconSx} />}
				checkedIcon={<PushPinIcon sx={iconSx} />}
				onChange={(event: any, checked: boolean) => props.onChange?.(checked)}
			/>
		);
	};

	return render();
};

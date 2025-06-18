import React from 'react';
import { IconButton, SvgIconProps } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type StatusIconProps = SvgIconProps & {
	status?: boolean;
	fontSize?: string;
};

export const StatusIcon = ({ status, fontSize, ...props }: StatusIconProps): React.JSX.Element => {
	const render = () => {
		return (
			<IconButton
				disableRipple={true}
				sx={{
					marginX: '0 !important',
				}}>
				{status ? (
					<CheckCircleIcon
						{...props}
						sx={{
							color: 'success.main',
							fontSize: fontSize,
						}}
					/>
				) : (
					<CancelIcon
						{...props}
						sx={{
							color: 'error.main',
							fontSize: fontSize,
						}}
					/>
				)}
			</IconButton>
		);
	};

	return render();
};

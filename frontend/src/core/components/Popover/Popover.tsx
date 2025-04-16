import React from 'react';
import * as MUI from '@mui/material';
import { PopoverOrigin, SxProps } from '@mui/material';
import { Dialog } from '../Dialog/Dialog';
import { useResponsive } from '../../hooks/useResponsive';

interface PopoverProps {
	anchorEl?: React.MutableRefObject<any>;
	anchorOrigin?: PopoverOrigin;
	transformOrigin?: PopoverOrigin;
	open: boolean;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const Popover = (props: PopoverProps): JSX.Element => {
	const responsive: boolean = useResponsive();

	const render = () => {
		return (
			<>
				{!responsive && (
					<MUI.Popover
						anchorEl={props.anchorEl?.current}
						anchorOrigin={props.anchorOrigin || { horizontal: 'right', vertical: 'bottom' }}
						transformOrigin={props.transformOrigin || { horizontal: 'right', vertical: 'top' }}
						open={props.open}
						onClose={props.onClose}
						slotProps={{
							paper: {
								sx: props.sx,
							},
						}}>
						{props.children}
					</MUI.Popover>
				)}
				{responsive && (
					<Dialog
						open={props.open}
						onClose={props.onClose}
						sx={{
							paddingX: '0',
						}}>
						{props.children}
					</Dialog>
				)}
			</>
		);
	};

	return render();
};

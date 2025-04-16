import React from 'react';
import { SxProps } from '@mui/system';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
import { GenericDialog } from '../Dialog/GenericDialog';
import { useResponsive } from '../../hooks/useResponsive';

interface GenericPopoverProps {
	anchorEl?: React.MutableRefObject<any>;
	anchorOrigin?: PopoverOrigin;
	transformOrigin?: PopoverOrigin;
	open: boolean;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const GenericPopover = (props: GenericPopoverProps): JSX.Element => {
	const responsive: boolean = useResponsive();

	const render = () => {
		return (
			<>
				{!responsive && (
					<Popover
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
					</Popover>
				)}
				{responsive && (
					<GenericDialog
						open={props.open}
						onClose={props.onClose}
						sx={{
							paddingX: '0',
						}}>
						{props.children}
					</GenericDialog>
				)}
			</>
		);
	};

	return render();
};

import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
import { GenericDialog } from '../Dialog/GenericDialog';

interface IGenericPopoverProps {
	anchorEl?: React.MutableRefObject<any>;
	anchorOrigin?: PopoverOrigin;
	transformOrigin?: PopoverOrigin;
	open: boolean;
	onClose?: (event: any) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const GenericPopover: React.FC<IGenericPopoverProps> = (props: IGenericPopoverProps): JSX.Element => {
	const theme: Theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.down('md'));

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

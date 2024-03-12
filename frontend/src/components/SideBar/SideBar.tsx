import * as React from 'react';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

interface ISideBarProps {
	open: boolean;
	title?: React.ReactNode;
	onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
	children?: React.ReactNode;
}

export const SideBar: React.FC<ISideBarProps> = (props: ISideBarProps): JSX.Element => {
	const theme: Theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.down('md'));

	const render = () => {
		return (
			<>
				<Drawer
					anchor={responsive ? 'bottom' : 'right'}
					open={props.open}
					onClose={props.onClose}>
					<Box
						sx={{
							height: responsive ? '350px' : '100%',
							width: responsive ? '100%' : '480px',
						}}>
						{props.title && (
							<>
								<Box
									sx={{
										padding: '15px',
									}}>
									{props.title}
								</Box>
								<Divider />
							</>
						)}
						<Box
							sx={{
								padding: '10px',
							}}>
							{props.children}
						</Box>
					</Box>
				</Drawer>
			</>
		);
	};

	return render();
};

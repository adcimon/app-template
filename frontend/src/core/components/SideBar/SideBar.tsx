import React from 'react';
import { Box, Divider, Drawer, Stack } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';

interface SideBarProps {
	title?: React.ReactNode;
	open: boolean;
	responsive?: boolean;
	divider?: boolean;
	height?: number | string;
	width?: number | string;
	onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
	children?: React.ReactNode;
}

export const SideBar = (props: SideBarProps): React.JSX.Element => {
	const responsive: boolean = useResponsive();

	const render = () => {
		const isResponsive: boolean = (props.responsive ?? false) && responsive;
		return (
			<Drawer
				anchor={isResponsive ? 'bottom' : 'right'}
				open={props.open}
				onClose={props.onClose}
				sx={{
					'& .MuiDrawer-paper': {
						borderLeftColor: 'rgba(145, 158, 171, 0.2)',
						borderLeftStyle: 'solid',
						borderLeftWidth: '1px',
						height: isResponsive ? props.height || '350px' : '100%',
						width: isResponsive ? '100%' : props.width || '480px',
					},
				}}>
				<Stack
					direction='column'
					sx={{
						height: '100%',
						width: '100%',
					}}>
					{props.title && (
						<Box
							sx={{
								padding: '15px',
							}}>
							{props.title}
						</Box>
					)}
					{props.divider && (
						<Divider
							sx={{
								marginBottom: '1rem',
								width: '100%',
							}}
						/>
					)}
					<Box
						sx={{
							flexBasis: '0',
							flexGrow: '1',
							overflowY: 'auto',
							paddingBottom: '15px',
							paddingX: '15px',
						}}>
						{props.children}
					</Box>
				</Stack>
			</Drawer>
		);
	};

	return render();
};

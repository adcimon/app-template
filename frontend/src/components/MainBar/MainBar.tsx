import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { AccountMenu } from './AccountMenu/AccountMenu';
import { NotificationsMenu } from './NotificationsMenu/NotificationsMenu';

interface MainBarProps {
	height?: string;
}

export const MainBar = (props: MainBarProps): React.JSX.Element => {
	const render = () => {
		return (
			<AppBar
				position='relative'
				sx={{
					height: props.height,
					justifyContent: 'center',
				}}>
				<Toolbar
					sx={{
						paddingX: '16px !important',
					}}>
					{/* Left */}
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexGrow: '1',
						}}>
						<Box
							sx={{
								backgroundColor: 'currentColor',
								flexShrink: 0,
								height: '32px',
								mask: 'url(/images/logo_white.png) center / contain no-repeat',
								width: '32px',
							}}
						/>
					</Box>
					{/* Center */}
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexGrow: '1',
							justifyContent: 'center',
						}}>
						{/* Empty */}
					</Box>
					{/* Right */}
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexGrow: '1',
							gap: '10px',
							justifyContent: 'flex-end',
						}}>
						<NotificationsMenu />
						<AccountMenu />
					</Box>
				</Toolbar>
			</AppBar>
		);
	};

	return render();
};

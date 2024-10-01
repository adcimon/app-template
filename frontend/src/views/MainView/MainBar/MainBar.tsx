import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AccountMenu } from './AccountMenu/AccountMenu';
import { NotificationsMenu } from './NotificationsMenu/NotificationsMenu';

interface IMainBarProps {
	height?: string;
}

export const MainBar: React.FC<IMainBarProps> = (props: IMainBarProps): JSX.Element => {
	const render = () => {
		return (
			<>
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
							<img
								src='/images/logo_white.png'
								style={{
									height: 'auto',
									minWidth: '32px',
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
			</>
		);
	};

	return render();
};

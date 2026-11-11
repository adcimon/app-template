import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';

export const Logo = (): React.JSX.Element => {
	const render = () => {
		return (
			<Stack
				direction='column'
				sx={{
					alignItems: 'center',
					alignSelf: 'center',
					gap: '10px',
					marginBottom: '8px',
				}}>
				<Box
					sx={{
						alignItems: 'center',
						backgroundColor: 'primary.main',
						borderRadius: '16px',
						boxShadow: (theme: Theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
						display: 'flex',
						height: '64px',
						justifyContent: 'center',
						width: '64px',
					}}>
					<Box
						sx={{
							backgroundColor: '#ffffff',
							height: '34px',
							mask: 'url(/images/logo_white.png) center / contain no-repeat',
							width: '34px',
						}}
					/>
				</Box>
				<Typography
					sx={{
						fontSize: '1.75rem',
						fontWeight: 700,
						letterSpacing: '-0.02em',
						lineHeight: 1.1,
					}}>
					App Template
				</Typography>
			</Stack>
		);
	};

	return render();
};

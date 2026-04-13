import React from 'react';
import { Box, Card, CardContent, Container, Grid } from '@mui/material';

interface LaunchViewProps {
	children?: React.ReactNode;
}

export const LaunchView = (props: LaunchViewProps): React.JSX.Element => {
	const render = () => {
		return (
			<Container
				maxWidth={false}
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					justifyContent: 'center',
				}}>
				<Box
					sx={{
						backgroundColor: 'background.default',
						height: '100%',
						position: 'fixed',
						width: '100%',
						zIndex: '-1',
					}}
				/>
				<Container maxWidth='md'>
					<Card>
						<Grid container>
							<Grid
								size={{
									xs: 12,
									md: 6,
									lg: 6,
								}}>
								<Box
									sx={{
										height: {
											xs: '128px',
											md: '100%',
										},
										width: '100%',
									}}>
									<img
										src='/images/app_banner.jpg'
										style={{
											height: '100%',
											objectFit: 'cover',
											width: '100%',
										}}
									/>
								</Box>
							</Grid>
							<Grid
								size={{
									xs: 12,
									md: 6,
									lg: 6,
								}}>
								<CardContent
									sx={{
										alignItems: 'center',
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem',
										justifyContent: 'center',
									}}>
									{props.children}
								</CardContent>
							</Grid>
						</Grid>
					</Card>
				</Container>
			</Container>
		);
	};

	return render();
};

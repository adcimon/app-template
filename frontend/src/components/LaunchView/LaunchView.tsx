import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

interface ILaunchViewProps {
	children?: React.ReactNode;
}

export const LaunchView: React.FC<ILaunchViewProps> = (props: ILaunchViewProps): JSX.Element => {
	const render = () => {
		return (
			<>
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
									item
									xs={12}
									md={6}
									lg={6}>
									<Box
										sx={{
											height: { xs: '128px', md: '100%' },
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
									item
									xs={12}
									md={6}
									lg={6}>
									<CardContent
										sx={{
											alignItems: 'center',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
										}}>
										{props.children}
									</CardContent>
								</Grid>
							</Grid>
						</Card>
					</Container>
				</Container>
			</>
		);
	};

	return render();
};

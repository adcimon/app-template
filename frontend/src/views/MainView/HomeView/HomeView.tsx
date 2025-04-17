import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserCard } from '../../../core/components/Card/UserCard';

export const HomeView = (): React.JSX.Element => {
	const render = () => {
		return (
			<>
				<Box
					sx={{
						paddingBottom: 6,
						paddingTop: 8,
					}}>
					<Container maxWidth='sm'>
						<Typography
							variant='h4'
							gutterBottom={true}
							sx={{
								color: 'text.primary',
								textAlign: 'center',
							}}>
							App Template
						</Typography>
						<Typography
							variant='h6'
							paragraph
							sx={{
								color: 'text.secondary',
								textAlign: 'center',
							}}>
							Welcome to the application template
						</Typography>
						<Stack
							direction='row'
							spacing={2}
							sx={{
								justifyContent: 'center',
								paddingTop: 4,
							}}>
							<Button variant='contained'>Play</Button>
							<Button variant='outlined'>Prepare</Button>
						</Stack>
					</Container>
				</Box>
				<Container
					maxWidth='md'
					sx={{
						marginBottom: '20px',
					}}>
					<Grid2
						container
						spacing={4}
						sx={{
							justifyContent: 'center',
						}}>
						<Grid2
							size={{
								xs: 12,
								sm: 6,
								md: 4,
							}}>
							<UserCard
								title='WALL-E'
								text='Waste Allocation Load Lifter: Earth-Class'
								image='/images/walle_banner.jpg'
								avatar='/images/walle.png'>
								<Button
									href='https://en.wikipedia.org/wiki/WALL-E_(character)'
									target='_blank'
									size='small'>
									Explore
								</Button>
							</UserCard>
						</Grid2>
						<Grid2
							size={{
								xs: 12,
								sm: 6,
								md: 4,
							}}>
							<UserCard
								title='R2-D2'
								text='Second Generation Robotic Droid Series-2'
								image='/images/r2d2_banner.jpg'
								avatar='/images/r2d2.png'>
								<Button
									href='https://en.wikipedia.org/wiki/R2-D2'
									target='_blank'
									size='small'>
									Explore
								</Button>
							</UserCard>
						</Grid2>
						<Grid2
							size={{
								xs: 12,
								sm: 6,
								md: 4,
							}}>
							<UserCard
								title='Iron Giant'
								text='Superman'
								image='/images/iron_giant_banner.jpg'
								avatar='/images/iron_giant.png'>
								<Button
									href='https://en.wikipedia.org/wiki/The_Iron_Giant'
									target='_blank'
									size='small'>
									Explore
								</Button>
							</UserCard>
						</Grid2>
					</Grid2>
				</Container>
			</>
		);
	};

	return render();
};

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserCard } from '../../Card/UserCard';

export const HomeView: React.FC = (): JSX.Element => {
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
							gutterBottom
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
					<Grid
						container
						spacing={4}
						sx={{
							justifyContent: 'center',
						}}>
						<Grid
							item
							xs={12}
							sm={6}
							md={4}>
							<UserCard
								image='/images/walle_banner.jpg'
								avatar='/images/walle.png'
								title='WALL-E'
								text='Waste Allocation Load Lifter: Earth-Class'>
								<Button
									href='https://en.wikipedia.org/wiki/WALL-E_(character)'
									target='_blank'
									size='small'>
									Explore
								</Button>
							</UserCard>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={4}>
							<UserCard
								image='/images/r2d2_banner.jpg'
								avatar='/images/r2d2.png'
								title='R2-D2'
								text='Second Generation Robotic Droid Series-2'>
								<Button
									href='https://en.wikipedia.org/wiki/R2-D2'
									target='_blank'
									size='small'>
									Explore
								</Button>
							</UserCard>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={4}>
							<UserCard
								image='/images/iron_giant_banner.jpg'
								avatar='/images/iron_giant.png'
								title='Iron Giant'
								text='Superman'>
								<Button
									href='https://en.wikipedia.org/wiki/The_Iron_Giant'
									target='_blank'
									size='small'>
									Explore
								</Button>
							</UserCard>
						</Grid>
					</Grid>
				</Container>
			</>
		);
	};

	return render();
};

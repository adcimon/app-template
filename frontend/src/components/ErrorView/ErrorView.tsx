import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Window } from '../Window/Window';
import { Button, Typography } from '@mui/material';
import { UrlUtils } from '../../utils/urlUtils';

interface IErrorViewProps {
	error?: Error;
}

export const ErrorView: React.FC<IErrorViewProps> = (props: IErrorViewProps): JSX.Element => {
	const handleClick = () => {
		UrlUtils.redirectToHome();
	};

	const render = () => {
		return (
			<>
				<Window
					open={true}
					sx={{
						alignItems: 'center',
						height: '100%',
						justifyContent: 'center',
					}}>
					<Stack
						direction='row'
						spacing={2}
						sx={{
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Card>
							<Grid container>
								<Grid
									item
									xs={12}
									md={6}
									lg={6}>
									<Box
										sx={{
											height: { xs: '256px', md: '100%' },
											width: '100%',
										}}>
										<img
											src='/images/error.jpg'
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
											height: '100%',
											width: '100%',
										}}>
										<Stack
											direction='column'
											spacing={4}
											sx={{
												alignItems: 'center',
												height: '100%',
												justifyContent: 'center',
											}}>
											<Typography
												variant='h4'
												sx={{
													textAlign: 'center',
												}}>
												{props?.error?.message || 'Something went wrong'}
											</Typography>
											<Button
												variant='contained'
												onClick={handleClick}>
												Return Home
											</Button>
										</Stack>
									</CardContent>
								</Grid>
							</Grid>
						</Card>
					</Stack>
				</Window>
			</>
		);
	};

	return render();
};

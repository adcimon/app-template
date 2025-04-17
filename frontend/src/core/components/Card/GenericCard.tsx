import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';

interface GenericCardProps {
	title?: string;
	image?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
}

export const GenericCard = (props: GenericCardProps): JSX.Element => {
	const render = () => (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}>
			<CardMedia
				component='div'
				image={props.image}
				sx={{
					paddingTop: '56.25%' /* 16:9 */,
				}}
			/>
			<CardContent
				sx={{
					flexGrow: 1,
				}}>
				<Stack
					direction='column'
					sx={{
						alignItems: 'center',
					}}>
					<Typography
						variant='h6'
						gutterBottom={true}>
						{props.title}
					</Typography>
					{props.children}
				</Stack>
			</CardContent>
			<Divider
				sx={{
					borderStyle: 'dashed',
				}}
			/>
			<CardActions
				sx={{
					justifyContent: 'space-between',
				}}>
				{props.actions}
			</CardActions>
		</Card>
	);

	return render();
};

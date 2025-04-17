import React from 'react';
import * as MUI from '@mui/material';
import { CardActions, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';

interface CardProps {
	title?: string;
	image?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
}

export const Card = (props: CardProps): JSX.Element => {
	const render = () => (
		<MUI.Card
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
		</MUI.Card>
	);

	return render();
};

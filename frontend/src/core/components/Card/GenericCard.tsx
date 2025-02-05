import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IGenericCardProps {
	title?: string;
	image?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
}

export const GenericCard: React.FC<IGenericCardProps> = (props: IGenericCardProps): JSX.Element => {
	const render = () => (
		<>
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
							gutterBottom>
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
		</>
	);

	return render();
};

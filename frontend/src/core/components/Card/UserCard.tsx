import React from 'react';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	Stack,
	Theme,
	Typography,
	useTheme,
} from '@mui/material';

interface UserCardProps {
	title?: string;
	text?: string;
	image?: string;
	avatar?: string;
	children?: React.ReactNode;
}

export const UserCard = (props: UserCardProps): JSX.Element => {
	const theme: Theme = useTheme();
	const render = () => (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}>
			<CardMedia
				image={props.image}
				component='div'
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					position: 'relative',
					paddingTop: '56.25%' /* 16:9 */,
				}}>
				<svg
					viewBox='0 0 144 62'
					style={{
						bottom: '-27px',
						height: '62px',
						position: 'absolute',
						width: '144px',
					}}>
					<path
						fill={theme.palette.background.paper}
						fillRule='evenodd'
						d='m111.34 23.88c-10.62-10.46-18.5-23.88-38.74-23.88h-1.2c-20.24 0-28.12 13.42-38.74 23.88-7.72 9.64-19.44 11.74-32.66 12.12v26h144v-26c-13.22-.38-24.94-2.48-32.66-12.12z'></path>
				</svg>
				<Avatar
					src={props.avatar}
					sx={{
						color: 'text.primary',
						height: '64px',
						transform: 'translateY(36px)',
						width: '64px',
					}}
				/>
			</CardMedia>
			<CardContent
				sx={{
					flexGrow: 1,
					marginTop: '20px',
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
					<Typography color='text.secondary'>{props.text}</Typography>
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
				{props.children}
			</CardActions>
		</Card>
	);

	return render();
};

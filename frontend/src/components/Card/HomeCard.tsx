import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IHomeCardProps {
	title?: string;
	text?: string;
	label?: string;
	image?: string;
	tint?: string;
	onClick?: (event: any) => void;
}

export const HomeCard: React.FC<IHomeCardProps> = (props: IHomeCardProps): JSX.Element => {
	const handleClick = (event: any) => {
		props.onClick?.(event);
	};

	const render = () => {
		const backgroundImage: string = props.tint
			? `linear-gradient(${props.tint}, ${props.tint}), url("${props.image}")`
			: `url("${props.image}")`;
		return (
			<>
				<Box
					sx={{
						alignItems: 'center',
						backgroundAttachment: 'scroll scroll',
						backgroundClip: 'border-box border-box',
						backgroundImage: backgroundImage,
						backgroundOrigin: 'padding-box, padding-box',
						backgroundPosition: 'center center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						display: 'flex',
						flex: '1',
						flexDirection: 'column',
						gap: '20px',
						justifyContent: 'center',
						height: '100%',
						paddingX: '20px',
						width: '100%',
					}}>
					<Typography
						variant='h3'
						color='neutral.light'>
						{props.title}
					</Typography>
					<Typography
						variant='h6'
						color='neutral.light'
						sx={{
							textAlign: 'center',
						}}>
						{props.text}
					</Typography>
					<Button
						onClick={handleClick}
						variant='outlined'
						sx={{
							borderColor: 'white',
							borderRadius: '5px',
							color: 'white',
							fontWeight: 'bold',
							width: '150px',
							'&:hover': {
								backgroundColor: 'white',
								borderColor: 'white',
								borderRadius: '5px',
								color: 'neutral.dark',
							},
						}}>
						{props.label}
					</Button>
				</Box>
			</>
		);
	};

	return render();
};

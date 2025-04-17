import React from 'react';
import { IconButton, Link, SxProps } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

interface LinkButtonProps {
	link?: string;
	size?: 'small' | 'medium' | 'large';
	sx?: SxProps;
}

export const LinkButton = (props: LinkButtonProps): JSX.Element => {
	const render = () => {
		return (
			<Link
				href={props.link}
				target='_blank'>
				<IconButton
					size={props.size}
					sx={props.sx}>
					<LaunchIcon
						color='primary'
						fontSize='inherit'
					/>
				</IconButton>
			</Link>
		);
	};

	return render();
};

import React from 'react';
import { IconButton, IconButtonProps, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

type LinkButtonProps = IconButtonProps & {
	link?: string;
};

export const LinkButton = (props: LinkButtonProps): JSX.Element => {
	const render = () => {
		return (
			<Link
				href={props.link}
				target='_blank'>
				<IconButton {...props}>
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

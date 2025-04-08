import React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';

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

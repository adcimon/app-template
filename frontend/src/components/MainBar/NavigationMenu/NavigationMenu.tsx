import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';

interface NavigationMenuProps {
	children?: React.ReactNode;
}

export const NavigationMenu = (props: NavigationMenuProps): React.JSX.Element => {
	const render = () => {
		return (
			<Breadcrumbs
				separator={
					<Typography
						variant='h6'
						sx={{
							color: 'neutral.light',
							fontWeight: 'bold',
						}}>
						/
					</Typography>
				}>
				{props.children}
			</Breadcrumbs>
		);
	};

	return render();
};

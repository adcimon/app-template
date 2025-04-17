import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

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

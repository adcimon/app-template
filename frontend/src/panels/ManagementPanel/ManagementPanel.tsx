import React from 'react';
import { Box, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { UsersMenu } from './UsersMenu/UsersMenu';
import { useBreakpointDown } from '../../core/hooks/useBreakpoint';

export const ManagementPanel = (): React.JSX.Element => {
	const headerHeight = {
		md: '190px',
		lg: '290px',
	};

	const isBreakpoint: boolean = useBreakpointDown();

	const [tab, setTab] = React.useState<number>(0);

	const handleTabChange = (event: any, value: number) => {
		setTab(value);
	};

	const renderHeader = () => {
		return (
			<Card>
				<Box
					sx={{
						backgroundAttachment: 'scroll scroll',
						backgroundClip: 'border-box border-box',
						backgroundImage:
							'linear-gradient(rgba(0, 79, 225, 0.8), rgba(1, 41, 114, 0.8)), url("/images/admin_banner.jpg")',
						backgroundOrigin: 'padding-box, padding-box',
						backgroundPosition: 'center center',
						backgroundSize: 'cover',
						height: isBreakpoint ? headerHeight.md : headerHeight.lg,
						position: 'relative',
					}}
				/>
				<Stack
					direction='row'
					sx={{
						justifyContent: isBreakpoint ? 'flex-start' : 'flex-end',
						width: '100%',
					}}>
					<Tabs
						value={tab}
						onChange={handleTabChange}>
						<Tab
							label={
								<Stack
									direction='row'
									sx={{
										gap: '0.25rem',
									}}>
									<PeopleAltIcon />
									<Typography>Users</Typography>
								</Stack>
							}
						/>
					</Tabs>
				</Stack>
			</Card>
		);
	};

	const renderTab = () => {
		switch (tab) {
			case 0:
				return <UsersMenu />;
			default:
				return <></>;
		}
	};

	const render = () => {
		return (
			<Stack
				sx={{
					gap: '1.5rem',
				}}>
				{renderHeader()}
				{renderTab()}
			</Stack>
		);
	};

	return render();
};

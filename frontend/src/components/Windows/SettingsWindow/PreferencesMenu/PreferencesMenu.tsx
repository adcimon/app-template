import React from 'react';
import { Box, Card, CardContent, CardHeader, Grid, MenuItem, Typography } from '@mui/material';
import { Select } from '../../../../core/components/Select/Select';
import { useAppState } from '../../../../states/app/useAppState';

export const PreferencesMenu = (): React.JSX.Element => {
	const appState = useAppState();

	const handleChangeTheme = (event: any) => {
		const theme: number = parseInt(event.target.value);
		appState.setTheme(theme);
	};

	const renderTheme = () => {
		return (
			<>
				<Box>
					<Typography>Theme</Typography>
					<Typography
						variant='body2'
						sx={{
							color: 'text.secondary',
							marginTop: '5px',
						}}>
						Change the appearance of the application.
					</Typography>
				</Box>
				<Select
					value={appState.theme.toString()}
					onChange={handleChangeTheme}>
					<MenuItem value={0}>Base</MenuItem>
					<MenuItem value={1}>Custom Light</MenuItem>
					<MenuItem value={2}>Custom Dark</MenuItem>
				</Select>
			</>
		);
	};

	const renderItem = (children: React.ReactNode) => {
		return (
			<Grid
				size={{
					xs: 12,
					sm: 12,
					md: 12,
				}}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					{children}
				</Box>
			</Grid>
		);
	};

	const render = () => {
		return (
			<Card>
				<CardHeader />
				<CardContent
					sx={{
						paddingTop: 0,
					}}>
					<Box
						sx={{
							margin: -1.5,
							padding: 2,
						}}>
						<Grid
							container
							spacing={3}>
							{renderItem(renderTheme())}
						</Grid>
					</Box>
				</CardContent>
			</Card>
		);
	};

	return render();
};

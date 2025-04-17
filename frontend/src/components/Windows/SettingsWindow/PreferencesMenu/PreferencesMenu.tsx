import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid2 from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useAppState } from '../../../../states/app/useAppState';

export const PreferencesMenu = (): React.JSX.Element => {
	const appState = useAppState();

	const handleChangeTheme = (event: SelectChangeEvent) => {
		const theme: number = parseInt(event.target.value);
		appState.setTheme(theme);
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
						<Grid2
							container
							spacing={3}>
							<Grid2
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
								</Box>
							</Grid2>
						</Grid2>
					</Box>
				</CardContent>
			</Card>
		);
	};

	return render();
};

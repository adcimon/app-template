import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useAppState } from '../../../../../../hooks/useAppState';

export const PreferencesView: React.FC = (): JSX.Element => {
	const { appState, setAppState } = useAppState();

	const handleChangeTheme = (event: SelectChangeEvent) => {
		setAppState({
			...appState,
			theme: parseInt(event.target.value),
		});
	};

	const render = () => {
		return (
			<>
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
								<Grid
									item
									xs={12}
									md={12}
									lg={12}>
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
								</Grid>
							</Grid>
						</Box>
					</CardContent>
				</Card>
			</>
		);
	};

	return render();
};

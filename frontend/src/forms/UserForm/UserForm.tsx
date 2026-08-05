import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { LocaleSelect } from '../../core/components/Select/LocaleSelect';
import { TimezoneSelect } from '../../core/components/Select/TimezoneSelect';
import { User } from '../../api/api';
import { UserDfo } from './userDfo';

export interface UserFormProps {
	user?: User;
	values: UserDfo;
	onChange: (key: any, value: any) => void;
}

export const UserForm = (props: UserFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<Box
				sx={{
					margin: -1.5,
					padding: 2,
				}}>
				<Grid
					container
					spacing={3}>
					<Grid
						size={{
							xs: 12,
							md: 6,
						}}>
						<TextField
							label='Name'
							value={props.values.name ?? ''}
							onChange={(event: any) => props.onChange('name', event.target.value)}
							fullWidth={true}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
						/>
					</Grid>
					<Grid
						size={{
							xs: 12,
							md: 6,
						}}>
						<TextField
							label='Surname'
							value={props.values.surname ?? ''}
							onChange={(event: any) => props.onChange('surname', event.target.value)}
							fullWidth={true}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
						/>
					</Grid>
					<Grid
						size={{
							xs: 12,
							md: 6,
						}}>
						<TextField
							label='Birthdate'
							type='date'
							value={props.values.birthdate ?? ''}
							onChange={(event: any) => props.onChange('birthdate', event.target.value)}
							fullWidth={true}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
						/>
					</Grid>
					<Grid
						size={{
							xs: 12,
							md: 6,
						}}>
						<LocaleSelect
							value={props.values.locale ?? ''}
							onChange={(event: any) => props.onChange('locale', event.target.value?.code || '')}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
						/>
					</Grid>
					<Grid
						size={{
							xs: 12,
							md: 6,
						}}>
						<TimezoneSelect
							value={props.values.timezone ?? ''}
							onChange={(event: any) => props.onChange('timezone', event.target.value)}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		);
	};

	return render();
};

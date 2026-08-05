import React from 'react';
import { Box, Grid } from '@mui/material';
import { countries, CountrySelect, CountryType } from '../../core/components/Select/CountrySelect';
import { PhoneField } from '../../core/components/Field/PhoneField';
import { ChangePhoneDfo } from './changePhoneDfo';

export interface ChangePhoneFormProps {
	values: ChangePhoneDfo;
	onChange: (key: any, value: any) => void;
}

export const ChangePhoneForm = (props: ChangePhoneFormProps): React.JSX.Element => {
	const render = () => {
		const country: CountryType | undefined = countries.find((c: CountryType) => c.phone === props.values.countryCode);
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
							md: 12,
							lg: 12,
						}}>
						<CountrySelect
							value={country?.code ?? ''}
							onChange={(event: any) => props.onChange('countryCode', event.target.value?.phone)}
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
							md: 12,
							lg: 12,
						}}>
						<PhoneField
							label='Phone'
							value={props.values.nationalNumber ?? ''}
							onChange={(event: any) => props.onChange('nationalNumber', event.target.value)}
							fullWidth={true}
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

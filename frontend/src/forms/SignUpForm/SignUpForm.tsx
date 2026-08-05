import React from 'react';
import { Checkbox, Link, Stack, Typography } from '@mui/material';
import { EmailField } from '../../core/components/Field/EmailField';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { SignUpDfo } from './signUpDfo';

export interface SignUpFormProps {
	form: SignUpDfo;
	onChange: (key: any, value: any) => void;
	onOpenTermsOfService: (event: React.MouseEvent<HTMLElement>) => void;
	onOpenPrivacyPolicy: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SignUpForm = (props: SignUpFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<>
				<EmailField
					label='Email'
					value={props.form.email ?? ''}
					required={true}
					onChange={(event: any) => props.onChange('email', event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Password'
					value={props.form.password ?? ''}
					required={true}
					onChange={(event: any) => props.onChange('password', event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Confirm Password'
					value={props.form.confirmPassword ?? ''}
					required={true}
					onChange={(event: any) => props.onChange('confirmPassword', event.target.value)}
					fullWidth={true}
				/>
				<Stack
					direction='row'
					sx={{
						alignItems: 'center',
						gap: '0.5rem',
					}}>
					<Checkbox
						color='primary'
						value={props.form.legalAccepted}
						onChange={(event: any, checked: boolean) => props.onChange('legalAccepted', checked)}
					/>
					<Typography variant='subtitle2'>
						I have read and agree to the <Link onClick={props.onOpenTermsOfService}>Terms of Service</Link>{' '}
						and <Link onClick={props.onOpenPrivacyPolicy}>Privacy Policy</Link>.
					</Typography>
				</Stack>
			</>
		);
	};

	return render();
};

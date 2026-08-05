import React from 'react';
import { EmailField } from '../../core/components/Field/EmailField';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { SignInDfo } from './signInDfo';

export interface SignInFormProps {
	form: SignInDfo;
	onChange: (key: any, value: any) => void;
}

export const SignInForm = (props: SignInFormProps): React.JSX.Element => {
	return (
		<>
			<EmailField
				label='Email'
				value={props.form.email ?? ''}
				autoComplete='email'
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
		</>
	);
};

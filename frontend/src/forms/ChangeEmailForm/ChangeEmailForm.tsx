import React from 'react';
import { EmailField } from '../../core/components/Field/EmailField';
import { ChangeEmailDfo } from './changeEmailDfo';

export interface ChangeEmailFormProps {
	form: ChangeEmailDfo;
	onChange: (key: any, value: any) => void;
}

export const ChangeEmailForm = (props: ChangeEmailFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<EmailField
				variant='standard'
				value={props.form.email ?? ''}
				autoFocus={true}
				onChange={(event: any) => props.onChange('email', event.target.value)}
				fullWidth={true}
				margin='dense'
			/>
		);
	};

	return render();
};

import React from 'react';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { SignDownDfo } from './signDownDfo';

export interface SignDownFormProps {
	form: SignDownDfo;
	onChange: (key: any, value: any) => void;
}

export const SignDownForm = (props: SignDownFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<PasswordField
				variant='standard'
				value={props.form.password ?? ''}
				autoFocus={true}
				onChange={(event: any) => props.onChange('password', event.target.value)}
				fullWidth={true}
				margin='dense'
			/>
		);
	};

	return render();
};

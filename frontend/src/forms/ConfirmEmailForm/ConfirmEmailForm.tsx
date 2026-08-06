import React from 'react';
import { EmailField } from '../../core/components/Field/EmailField';
import { ConfirmEmailDfo } from './confirmEmailDfo';

export interface ConfirmEmailFormProps {
	values: ConfirmEmailDfo;
	onChange: (key: any, value: any) => void;
}

export const ConfirmEmailForm = (props: ConfirmEmailFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<EmailField
				variant='standard'
				label='Confirm Email'
				value={props.values.confirmEmail ?? ''}
				autoFocus={true}
				onChange={(event: any) => props.onChange('confirmEmail', event.target.value)}
				fullWidth={true}
				margin='dense'
			/>
		);
	};

	return render();
};

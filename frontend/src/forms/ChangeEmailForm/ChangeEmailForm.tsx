import React from 'react';
import { EmailField } from '../../core/components/Field/EmailField';
import { ChangeEmailDfo } from './changeEmailDfo';

export interface ChangeEmailFormProps {
	values: ChangeEmailDfo;
	onChange: (key: any, value: any) => void;
}

export const ChangeEmailForm = (props: ChangeEmailFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<EmailField
				label='Email'
				value={props.values.email ?? ''}
				onChange={(event: any) => props.onChange('email', event.target.value)}
				fullWidth={true}
				slotProps={{
					inputLabel: {
						shrink: true,
					},
				}}
			/>
		);
	};

	return render();
};

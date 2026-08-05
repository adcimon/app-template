import React from 'react';
import { TextField } from '@mui/material';
import { VerifyEmailDfo } from './verifyEmailDfo';

export interface VerifyEmailFormProps {
	form: VerifyEmailDfo;
	onChange: (key: any, value: any) => void;
}

export const VerifyEmailForm = (props: VerifyEmailFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<TextField
				type='number'
				variant='standard'
				value={props.form.code ?? ''}
				autoFocus={true}
				onChange={(event: any) => props.onChange('code', event.target.value)}
				fullWidth={true}
				margin='dense'
			/>
		);
	};

	return render();
};

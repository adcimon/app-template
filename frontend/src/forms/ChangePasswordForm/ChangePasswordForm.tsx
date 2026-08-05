import React from 'react';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { ChangePasswordDfo } from './changePasswordDfo';

export interface ChangePasswordFormProps {
	values: ChangePasswordDfo;
	onChange: (key: any, value: any) => void;
}

export const ChangePasswordForm = (props: ChangePasswordFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<>
				<PasswordField
					variant='standard'
					label='Current Password'
					placeholder='*****'
					value={props.values.currentPassword ?? ''}
					autoFocus={true}
					onChange={(event: any) => props.onChange('currentPassword', event.target.value)}
					fullWidth={true}
					margin='dense'
				/>
				<PasswordField
					variant='standard'
					label='New Password'
					placeholder='*****'
					value={props.values.newPassword ?? ''}
					onChange={(event: any) => props.onChange('newPassword', event.target.value)}
					fullWidth={true}
					margin='dense'
				/>
				<PasswordField
					variant='standard'
					label='Confirm Password'
					placeholder='*****'
					value={props.values.confirmPassword ?? ''}
					onChange={(event: any) => props.onChange('confirmPassword', event.target.value)}
					fullWidth={true}
					margin='dense'
				/>
			</>
		);
	};

	return render();
};

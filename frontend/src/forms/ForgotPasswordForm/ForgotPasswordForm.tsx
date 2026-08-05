import React from 'react';
import { Badge, Button, TextField } from '@mui/material';
import { EmailField } from '../../core/components/Field/EmailField';
import { PasswordField } from '../../core/components/Field/PasswordField';
import { ForgotPasswordDfo } from './forgotPasswordDfo';

export interface ForgotPasswordFormProps {
	values: ForgotPasswordDfo;
	sendDisabled: boolean;
	confirmDisabled: boolean;
	onChange: (key: any, value: any) => void;
	onSendCode: () => void;
	onConfirm: () => void;
}

export const ForgotPasswordForm = (props: ForgotPasswordFormProps): React.JSX.Element => {
	const render = () => {
		return (
			<>
				<EmailField
					label='Email'
					value={props.values.email ?? ''}
					required={true}
					onChange={(event: any) => props.onChange('email', event.target.value)}
					fullWidth={true}
				/>
				<Badge
					color='primary'
					badgeContent={1}
					sx={{
						width: '100%',
					}}>
					<Button
						variant='contained'
						disabled={props.sendDisabled}
						onClick={props.onSendCode}
						size='small'
						fullWidth={true}>
						Send Code
					</Button>
				</Badge>
				<TextField
					label='Code'
					placeholder='Code sent to your email'
					value={props.values.code ?? ''}
					required={true}
					onChange={(event: any) => props.onChange('code', event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Password'
					value={props.values.password ?? ''}
					autoComplete='new-password'
					required={true}
					onChange={(event: any) => props.onChange('password', event.target.value)}
					fullWidth={true}
				/>
				<PasswordField
					label='Confirm Password'
					value={props.values.confirmPassword ?? ''}
					required={true}
					onChange={(event: any) => props.onChange('confirmPassword', event.target.value)}
					fullWidth={true}
				/>
				<Badge
					color='primary'
					badgeContent={2}
					sx={{
						width: '100%',
					}}>
					<Button
						variant='contained'
						disabled={props.confirmDisabled}
						onClick={props.onConfirm}
						fullWidth={true}>
						Change
					</Button>
				</Badge>
			</>
		);
	};

	return render();
};

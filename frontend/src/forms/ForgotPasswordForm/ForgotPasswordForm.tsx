import React from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';
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
	const renderStep = (step: number, active: boolean, children: React.ReactNode) => {
		return (
			<Stack
				direction='row'
				sx={{
					alignItems: 'center',
					gap: '0.75rem',
					width: '100%',
				}}>
				<Box
					sx={{
						alignItems: 'center',
						backgroundColor: (theme: Theme) =>
							active ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.12),
						borderRadius: '50%',
						color: active ? 'primary.contrastText' : 'text.secondary',
						display: 'flex',
						flexShrink: 0,
						fontSize: '0.75rem',
						fontWeight: 700,
						height: '24px',
						justifyContent: 'center',
						width: '24px',
					}}>
					{step}
				</Box>
				<Box
					sx={{
						flex: 1,
						minWidth: 0,
					}}>
					{children}
				</Box>
			</Stack>
		);
	};

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
				{renderStep(
					1,
					!props.sendDisabled,
					<Button
						variant='contained'
						disabled={props.sendDisabled}
						onClick={props.onSendCode}
						size='small'
						fullWidth={true}>
						Send Code
					</Button>,
				)}
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
				{renderStep(
					2,
					!props.confirmDisabled,
					<Button
						variant='contained'
						disabled={props.confirmDisabled}
						onClick={props.onConfirm}
						fullWidth={true}>
						Change
					</Button>,
				)}
			</>
		);
	};

	return render();
};

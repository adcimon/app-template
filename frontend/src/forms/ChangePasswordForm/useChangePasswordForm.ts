import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { ChangePasswordDfo, newChangePasswordDfo } from './changePasswordDfo';

export function useChangePasswordForm() {
	const [form, setForm] = React.useState<ChangePasswordDfo>(newChangePasswordDfo());

	const validate = (): boolean => {
		return (
			!!form.newPassword && form.currentPassword !== form.newPassword && form.newPassword === form.confirmPassword
		);
	};

	const reset = () => {
		setForm(newChangePasswordDfo());
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: ChangePasswordDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, validate, reset, handleChange };
}

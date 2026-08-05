import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { ChangePasswordDfo, newChangePasswordDfo } from './changePasswordDfo';

export function useChangePasswordForm() {
	const [values, setValues] = React.useState<ChangePasswordDfo>(newChangePasswordDfo());

	const validate = (): boolean => {
		return (
			!!values.newPassword && values.currentPassword !== values.newPassword && values.newPassword === values.confirmPassword
		);
	};

	const reset = () => {
		setValues(newChangePasswordDfo());
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: ChangePasswordDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, validate, reset, handleChange };
}

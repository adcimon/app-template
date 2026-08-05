import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';
import { ForgotPasswordDfo, newForgotPasswordDfo } from './forgotPasswordDfo';

export function useForgotPasswordForm() {
	const [values, setValues] = React.useState<ForgotPasswordDfo>(newForgotPasswordDfo());

	const validateSendCode = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(values.email ?? '');
	};

	const validateChange = (): boolean => {
		return (
			AppUtils.EMAIL_REGEXP.test(values.email ?? '') &&
			!!values.code &&
			!!values.password &&
			values.password === values.confirmPassword
		);
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: ForgotPasswordDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, validateSendCode, validateChange, handleChange };
}

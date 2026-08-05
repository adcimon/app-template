import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';
import { ForgotPasswordDfo, newForgotPasswordDfo } from './forgotPasswordDfo';

export function useForgotPasswordForm() {
	const [form, setForm] = React.useState<ForgotPasswordDfo>(newForgotPasswordDfo());

	const validateSendCode = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(form.email ?? '');
	};

	const validateChange = (): boolean => {
		return (
			AppUtils.EMAIL_REGEXP.test(form.email ?? '') &&
			!!form.code &&
			!!form.password &&
			form.password === form.confirmPassword
		);
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: ForgotPasswordDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, validateSendCode, validateChange, handleChange };
}

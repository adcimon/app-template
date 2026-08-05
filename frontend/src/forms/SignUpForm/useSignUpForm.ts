import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';
import { newSignUpDfo, SignUpDfo } from './signUpDfo';

export function useSignUpForm() {
	const [form, setForm] = React.useState<SignUpDfo>(newSignUpDfo());

	const validate = (): boolean => {
		return (
			AppUtils.EMAIL_REGEXP.test(form.email ?? '') &&
			!!form.password &&
			form.password === form.confirmPassword &&
			!!form.legalAccepted
		);
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: SignUpDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, validate, handleChange };
}

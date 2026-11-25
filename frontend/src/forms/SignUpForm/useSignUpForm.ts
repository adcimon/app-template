import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';
import { newSignUpDfo, SignUpDfo } from './signUpDfo';

export function useSignUpForm() {
	const [values, setValues] = React.useState<SignUpDfo>(newSignUpDfo());

	const validate = (): boolean => {
		return (
			AppUtils.EMAIL_REGEXP.test(values.email ?? '') &&
			Boolean(values.password) &&
			values.password === values.confirmPassword &&
			Boolean(values.legalAccepted)
		);
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: SignUpDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, validate, handleChange };
}

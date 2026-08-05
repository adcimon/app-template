import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';
import { newSignInDfo, SignInDfo } from './signInDfo';

export function useSignInForm() {
	const [values, setValues] = React.useState<SignInDfo>(newSignInDfo());

	const validate = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(values.email ?? '') && !!values.password;
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: SignInDfo) => ObjectUtils.set(prev, key, value));
	};

	return {
		values,
		validate,
		handleChange,
	};
}

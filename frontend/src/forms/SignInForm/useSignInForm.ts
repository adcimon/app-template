import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';
import { newSignInDfo, SignInDfo } from './signInDfo';

export function useSignInForm() {
	const [form, setForm] = React.useState<SignInDfo>(newSignInDfo());

	const validate = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(form.email ?? '') && !!form.password;
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: SignInDfo) => ObjectUtils.set(prev, key, value));
	};

	return {
		form,
		validate,
		handleChange,
	};
}

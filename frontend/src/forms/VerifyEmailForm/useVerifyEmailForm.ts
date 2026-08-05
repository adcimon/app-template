import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { newVerifyEmailDfo, VerifyEmailDfo } from './verifyEmailDfo';

export function useVerifyEmailForm() {
	const [form, setForm] = React.useState<VerifyEmailDfo>(newVerifyEmailDfo());

	const validate = (): boolean => {
		return !!form.code;
	};

	const reset = () => {
		setForm(newVerifyEmailDfo());
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: VerifyEmailDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, validate, reset, handleChange };
}

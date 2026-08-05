import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { newVerifyEmailDfo, VerifyEmailDfo } from './verifyEmailDfo';

export function useVerifyEmailForm() {
	const [values, setValues] = React.useState<VerifyEmailDfo>(newVerifyEmailDfo());

	const validate = (): boolean => {
		return !!values.code;
	};

	const reset = () => {
		setValues(newVerifyEmailDfo());
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: VerifyEmailDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, validate, reset, handleChange };
}

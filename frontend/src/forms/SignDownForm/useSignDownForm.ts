import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { newSignDownDfo, SignDownDfo } from './signDownDfo';

export function useSignDownForm() {
	const [values, setValues] = React.useState<SignDownDfo>(newSignDownDfo());

	const validate = (): boolean => {
		return !!values.password;
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: SignDownDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, validate, handleChange };
}

import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { newSignDownDfo, SignDownDfo } from './signDownDfo';

export function useSignDownForm() {
	const [form, setForm] = React.useState<SignDownDfo>(newSignDownDfo());

	const validate = (): boolean => {
		return !!form.password;
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: SignDownDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, validate, handleChange };
}

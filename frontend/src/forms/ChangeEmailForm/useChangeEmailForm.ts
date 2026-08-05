import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { ChangeEmailDfo, newChangeEmailDfo } from './changeEmailDfo';

export function useChangeEmailForm() {
	const [values, setValues] = React.useState<ChangeEmailDfo>(newChangeEmailDfo());

	const handleChange = (key: any, value: any) => {
		setValues((prev: ChangeEmailDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, handleChange };
}

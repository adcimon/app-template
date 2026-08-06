import React from 'react';
import { ConfirmEmailDfo, newConfirmEmailDfo } from './confirmEmailDfo';
import { ObjectUtils } from '../../core/utils/objectUtils';

export function useConfirmEmailForm() {
	const [values, setValues] = React.useState<ConfirmEmailDfo>(newConfirmEmailDfo());

	const reset = () => {
		setValues(newConfirmEmailDfo());
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: ConfirmEmailDfo) => ObjectUtils.set(prev, key, value));
	};

	return {
		values,
		reset,
		handleChange,
	};
}

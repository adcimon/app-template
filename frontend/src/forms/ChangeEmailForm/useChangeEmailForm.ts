import React from 'react';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { ChangeEmailDfo, newChangeEmailDfo } from './changeEmailDfo';

export function useChangeEmailForm() {
	const [form, setForm] = React.useState<ChangeEmailDfo>(newChangeEmailDfo());

	const handleChange = (key: any, value: any) => {
		setForm((prev: ChangeEmailDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, handleChange };
}

import React from 'react';
import { ChangeEmailDfo, newChangeEmailDfo } from './changeEmailDfo';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { AppUtils } from '../../utils/appUtils';

export function useChangeEmailForm(email?: string) {
	const [values, setValues] = React.useState<ChangeEmailDfo>(newChangeEmailDfo(email));

	React.useEffect(() => {
		setValues(newChangeEmailDfo(email));
	}, [email]);

	const validate = (): boolean => {
		return AppUtils.EMAIL_REGEXP.test(values.email ?? '') && values.email !== email;
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: ChangeEmailDfo) => ObjectUtils.set(prev, key, value));
	};

	return {
		values,
		validate,
		handleChange,
	};
}

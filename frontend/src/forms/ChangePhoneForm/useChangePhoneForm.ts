import React from 'react';
import { ChangePhoneDfo, newChangePhoneDfo } from './changePhoneDfo';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { PhoneUtils } from '../../core/utils/phoneUtils';
import { AppUtils } from '../../utils/appUtils';

export function useChangePhoneForm(phone?: string) {
	const [values, setValues] = React.useState<ChangePhoneDfo>(newChangePhoneDfo(phone));

	React.useEffect(() => {
		setValues(newChangePhoneDfo(phone));
	}, [phone]);

	const validate = (): boolean => {
		const newPhone: string = PhoneUtils.compose(values.countryCode, values.nationalNumber);
		return AppUtils.PHONE_REGEXP.test(newPhone) && newPhone !== phone;
	};

	const reset = () => {
		setValues(newChangePhoneDfo(phone));
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: ChangePhoneDfo) => ObjectUtils.set(prev, key, value));
	};

	return {
		values,
		validate,
		reset,
		handleChange,
	};
}

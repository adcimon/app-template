import React from 'react';
import { User } from '../../api/api';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { newUserDfo, UserDfo } from './userDfo';

const KEYS: ObjectUtils.Keys<UserDfo>[] = ObjectUtils.getKeys(newUserDfo()) as ObjectUtils.Keys<UserDfo>[];

export function useUserForm(user?: User) {
	const [values, setValues] = React.useState<UserDfo>(newUserDfo());
	const [baseValues, setBaseValues] = React.useState<UserDfo>();

	React.useEffect(() => {
		if (!user) {
			setValues(newUserDfo());
			setBaseValues(undefined);
			return;
		}

		const values: UserDfo = {
			name: user.name,
			surname: user.surname,
			birthdate: user.birthdate,
			locale: user.locale,
			timezone: user.timezone,
		};

		setValues(values);
		setBaseValues(values);
	}, [user]);

	const validate = (): boolean => {
		if (!baseValues) {
			return false;
		}

		return !ObjectUtils.equals(baseValues, values, KEYS);
	};

	const handleChange = (key: any, value: any) => {
		setValues((prev: UserDfo) => ObjectUtils.set(prev, key, value));
	};

	return { values, validate, handleChange };
}

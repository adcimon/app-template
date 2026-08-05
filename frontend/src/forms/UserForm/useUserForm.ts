import React from 'react';
import { User } from '../../api/api';
import { ObjectUtils } from '../../core/utils/objectUtils';
import { newUserDfo, UserDfo } from './userDfo';

const KEYS: ObjectUtils.Keys<UserDfo>[] = ObjectUtils.getKeys(newUserDfo()) as ObjectUtils.Keys<UserDfo>[];

export function useUserForm(user?: User) {
	const [form, setForm] = React.useState<UserDfo>(newUserDfo());
	const [baseForm, setBaseForm] = React.useState<UserDfo>();

	React.useEffect(() => {
		if (!user) {
			setForm(newUserDfo());
			setBaseForm(undefined);
			return;
		}

		const form: UserDfo = {
			name: user.name,
			surname: user.surname,
			birthdate: user.birthdate,
			locale: user.locale,
			timezone: user.timezone,
		};

		setForm(form);
		setBaseForm(form);
	}, [user]);

	const validate = (): boolean => {
		if (!baseForm) {
			return false;
		}

		return !ObjectUtils.equals(baseForm, form, KEYS);
	};

	const handleChange = (key: any, value: any) => {
		setForm((prev: UserDfo) => ObjectUtils.set(prev, key, value));
	};

	return { form, validate, handleChange };
}

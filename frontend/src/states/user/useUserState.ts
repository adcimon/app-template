import { useAtom } from 'jotai';
import { UpdateEmailDto, UpdatePhoneDto, User } from '../../api/api';
import { ChangeEmailDfo } from '../../forms/ChangeEmailForm/changeEmailDfo';
import { ChangeIconDfo } from '../../forms/dfos/changeIconDfo';
import { ChangePhoneDfo } from '../../forms/ChangePhoneForm/changePhoneDfo';
import { UserDfo } from '../../forms/UserForm/userDfo';
import { useApi } from '../../clients/api/useApi';
import { UserState } from './userState';
import { PhoneUtils } from '../../core/utils/phoneUtils';

export function useUserState() {
	const api = useApi();

	const [user, setUser] = useAtom(UserState);

	const get = async (): Promise<User> => {
		const user: User = await api.client.services.users.getUser();
		setUser(user);
		return user;
	};

	const update = async (values: UserDfo): Promise<User> => {
		const user: User = await api.client.services.users.updateUser(values);
		setUser(user);
		return user;
	};

	const updateEmail = async (values: ChangeEmailDfo): Promise<User> => {
		const body: UpdateEmailDto = { email: values.email ?? '' };
		const user: User = await api.client.services.users.updateEmail(body);
		return user;
	};

	const updatePhone = async (values: ChangePhoneDfo): Promise<User> => {
		const body: UpdatePhoneDto = { phone: PhoneUtils.compose(values.countryCode, values.nationalNumber) };
		const user: User = await api.client.services.users.updatePhone(body);
		setUser(user);
		return user;
	};

	const updateIcon = async (values: ChangeIconDfo): Promise<User> => {
		const user: User = await api.client.services.users.updateIcon(values);
		return user;
	};

	const reset = () => {
		setUser(undefined);
	};

	return {
		user,
		get,
		update,
		updateEmail,
		updatePhone,
		updateIcon,
		reset,
	};
}

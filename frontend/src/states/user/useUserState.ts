import { useAtom } from 'jotai';
import { UpdateEmailDto, UpdateIconDto, UpdatePhoneDto, User } from '../../api/api';
import { UserDfo } from '../../forms/UserForm/userDfo';
import { useApi } from '../../clients/api/useApi';
import { UserState } from './userState';

export function useUserState() {
	const api = useApi();

	const [user, setUser] = useAtom(UserState);

	const get = async (): Promise<User> => {
		const user: User = await api.client.services.users.getUser();
		setUser(user);
		return user;
	};

	const update = async (form: UserDfo): Promise<User> => {
		const user: User = await api.client.services.users.updateUser(form);
		setUser(user);
		return user;
	};

	const updateEmail = async (email: string): Promise<User> => {
		const body: UpdateEmailDto = { email };
		const user: User = await api.client.services.users.updateEmail(body);
		return user;
	};

	const updatePhone = async (phone: string): Promise<User> => {
		const body: UpdatePhoneDto = { phone };
		const user: User = await api.client.services.users.updatePhone(body);
		setUser(user);
		return user;
	};

	const updateIcon = async (icon: string): Promise<User> => {
		const body: UpdateIconDto = { icon };
		const user: User = await api.client.services.users.updateIcon(body);
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

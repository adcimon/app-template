import { useAtom } from 'jotai';
import { User } from '../../model/api/user';
import { useApi } from '../../clients/api/apiContext';
import { UserState } from './userState';

export function useUserState<T extends User>() {
	const api = useApi();

	const [user, setUser] = useAtom(UserState);

	const get = async (): Promise<T> => {
		const user: T = await api.client?.usersService.getUser();
		setUser(user);
		return user;
	};

	const update = async (
		params: Partial<{
			name: string;
			surname: string;
			birthdate: string;
			locale: string;
			timezone: string;
		}> = {},
	): Promise<T> => {
		const user: T = await api.client?.usersService.updateUser(params);
		setUser(user);
		return user;
	};

	const updateEmail = async (email: string): Promise<T> => {
		const user: T = await api.client?.usersService.updateEmail(email);
		return user;
	};

	const updatePhone = async (phone: string): Promise<T> => {
		const user: T = await api.client?.usersService.updatePhone(phone);
		setUser(user);
		return user;
	};

	const updateIcon = async (icon: string): Promise<T> => {
		const user: T = await api.client?.usersService.updateIcon(icon);
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

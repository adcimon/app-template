import { useAtom } from 'jotai';
import { User } from '../../model/api/user';
import { useApi } from '../../clients/api/apiContext';
import { UserState } from './userState';

export function useUserState<T extends User>() {
	const api = useApi();

	const [user, setUser] = useAtom(UserState);

	const get = async (): Promise<T> => {
		const user: T = await api.client?.usersService.getMyUser();
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
		const user: T = await api.client?.usersService.updateMyUser(params);
		setUser(user);
		return user;
	};

	const updateEmail = async (email: string): Promise<T> => {
		const user: T = await api.client?.usersService.updateMyEmail(email);
		return user;
	};

	const updatePhone = async (phone: string): Promise<T> => {
		const user: T = await api.client?.usersService.updateMyPhone(phone);
		setUser(user);
		return user;
	};

	const updateAvatar = async (avatar: string): Promise<T> => {
		const user: T = await api.client?.usersService.updateMyAvatar(avatar);
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
		updateAvatar,
		reset,
	};
}

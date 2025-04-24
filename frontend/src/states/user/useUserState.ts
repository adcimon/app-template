import * as Recoil from 'recoil';
import { User } from '../../model/api/user';
import { useApiState } from '../api/useApiState';
import { UserState } from './userState';

export function useUserState<T extends User>() {
	const apiState = useApiState();

	const [user, setUser] = Recoil.useRecoilState(UserState);

	const get = async (): Promise<T> => {
		const user: T = await apiState.client?.usersService.getMyUser();
		setUser(user);
		return user;
	};

	const update = async (params?: {
		name?: string;
		surname?: string;
		birthdate?: string;
		locale?: string;
		timezone?: string;
	}): Promise<T> => {
		const user: T = await apiState.client?.usersService.updateMyUser(params);
		setUser(user);
		return user;
	};

	const updateEmail = async (email: string): Promise<T> => {
		const user: T = await apiState.client?.usersService.updateMyEmail(email);
		return user;
	};

	const updatePhone = async (phone: string): Promise<T> => {
		const user: T = await apiState.client?.usersService.updateMyPhone(phone);
		setUser(user);
		return user;
	};

	const updateAvatar = async (avatar: string): Promise<T> => {
		const user: T = await apiState.client?.usersService.updateMyAvatar(avatar);
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

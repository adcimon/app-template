import * as Recoil from 'recoil';
import { useApiState } from './useApiState';
import { UserState } from '../userState';

export function useUserState() {
	const apiState = useApiState();

	const [user, setUser] = Recoil.useRecoilState(UserState);

	const get = async (): Promise<any> => {
		const user: any = await apiState.client?.usersService.getMyUser();
		setUser(user);
		return user;
	};

	const update = async (params?: {
		name?: string;
		surname?: string;
		birthdate?: string;
		country?: string;
		timezone?: string;
	}): Promise<any> => {
		const user: any = await apiState.client?.usersService.updateMyUser(params);
		setUser(user);
		return user;
	};

	const updateEmail = async (email: string): Promise<any> => {
		const user: any = await apiState.client?.usersService.updateMyEmail(email);
		return user;
	};

	const updatePhone = async (phone: string): Promise<any> => {
		const user: any = await apiState.client?.usersService.updateMyPhone(phone);
		setUser(user);
		return user;
	};

	const updatePassword = async (currentPassword: string, newPassword: string): Promise<any> => {
		const user: any = await apiState.client?.usersService.updateMyPassword(currentPassword, newPassword);
		return user;
	};

	const updateAvatar = async (avatar: string): Promise<any> => {
		const user: any = await apiState.client?.usersService.updateMyAvatar(avatar);
		return user;
	};

	const reset = () => {
		setUser({});
	};

	return {
		user,
		get,
		update,
		updateEmail,
		updatePhone,
		updatePassword,
		updateAvatar,
		reset,
	};
}

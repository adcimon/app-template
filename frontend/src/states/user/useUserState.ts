import * as Recoil from 'recoil';
import { User } from '../../model/user';
import { Transforms } from '../../model/transforms/transforms';
import { useApiState } from '../api/useApiState';
import { UserState } from './userState';

export function useUserState() {
	const apiState = useApiState();

	const [user, setUser] = Recoil.useRecoilState(UserState);

	const get = async (): Promise<User> => {
		const dto: any = await apiState.client?.usersService.getMyUser();
		const user: User = Transforms.Dto.User(dto);
		setUser(user);
		return user;
	};

	const update = async (params?: {
		name?: string;
		surname?: string;
		birthdate?: string;
		country?: string;
		timezone?: string;
	}): Promise<User> => {
		const dto: any = await apiState.client?.usersService.updateMyUser(params);
		const user: User = Transforms.Dto.User(dto);
		setUser(user);
		return user;
	};

	const updateEmail = async (email: string): Promise<User> => {
		const dto: any = await apiState.client?.usersService.updateMyEmail(email);
		const user: User = Transforms.Dto.User(dto);
		return user;
	};

	const updatePhone = async (phone: string): Promise<User> => {
		const dto: any = await apiState.client?.usersService.updateMyPhone(phone);
		const user: User = Transforms.Dto.User(dto);
		setUser(user);
		return user;
	};

	const updateAvatar = async (avatar: string): Promise<User> => {
		const dto: any = await apiState.client?.usersService.updateMyAvatar(avatar);
		const user: User = Transforms.Dto.User(dto);
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

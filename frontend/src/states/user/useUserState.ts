import * as Recoil from 'recoil';
import { UserDto } from '../../dtos/userDto';
import { Transforms } from '../../dtos/transforms/transforms';
import { useApiState } from '../api/useApiState';
import { UserState } from './userState';

export function useUserState() {
	const apiState = useApiState();

	const [user, setUser] = Recoil.useRecoilState(UserState);

	const get = async (): Promise<UserDto> => {
		const user: any = await apiState.client?.usersService.getMyUser();
		const dto: UserDto = Transforms.ApiToDto.User(user);
		setUser(dto);
		return dto;
	};

	const update = async (params?: {
		name?: string;
		surname?: string;
		birthdate?: string;
		country?: string;
		timezone?: string;
	}): Promise<UserDto> => {
		const user: any = await apiState.client?.usersService.updateMyUser(params);
		const dto: UserDto = Transforms.ApiToDto.User(user);
		setUser(dto);
		return dto;
	};

	const updateEmail = async (email: string): Promise<UserDto> => {
		const user: any = await apiState.client?.usersService.updateMyEmail(email);
		const dto: UserDto = Transforms.ApiToDto.User(user);
		return dto;
	};

	const updatePhone = async (phone: string): Promise<UserDto> => {
		const user: any = await apiState.client?.usersService.updateMyPhone(phone);
		const dto: UserDto = Transforms.ApiToDto.User(user);
		setUser(dto);
		return dto;
	};

	const updateAvatar = async (avatar: string): Promise<UserDto> => {
		const user: any = await apiState.client?.usersService.updateMyAvatar(avatar);
		const dto: UserDto = Transforms.ApiToDto.User(user);
		return dto;
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

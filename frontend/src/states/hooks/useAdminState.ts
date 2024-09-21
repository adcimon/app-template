import * as Recoil from 'recoil';
import { useApiState } from './useApiState';
import { UsersState } from '../adminState';

export function useAdminState() {
	const apiState = useApiState();

	const [users, setUsers] = Recoil.useRecoilState(UsersState);

	const getUsers = async (): Promise<any[]> => {
		const users: any[] = await apiState.client?.usersService.getUsers();
		setUsers(users);
		return users;
	};

	const reset = () => {
		setUsers([]);
	};

	return {
		users,
		getUsers,
		reset,
	};
}

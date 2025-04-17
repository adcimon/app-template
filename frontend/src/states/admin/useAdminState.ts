import * as Recoil from 'recoil';
import { User } from '../../model/api/user';
import { useApiState } from '../api/useApiState';
import { UsersState } from './adminState';

export function useAdminState() {
	const apiState = useApiState();

	const [users, setUsers] = Recoil.useRecoilState(UsersState);

	const getUsers = async (): Promise<User[]> => {
		const users: User[] = await apiState.client?.adminService.getUsers();
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

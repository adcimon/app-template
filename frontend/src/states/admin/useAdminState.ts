import * as Recoil from 'recoil';
import { User } from '../../model/api/user';
import { useApi } from '../../clients/api/apiContext';
import { UsersState } from './adminState';

export function useAdminState() {
	const api = useApi();

	const [users, setUsers] = Recoil.useRecoilState(UsersState);

	const getUsers = async (): Promise<User[]> => {
		const users: User[] = await api.client?.adminService.getUsers();
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

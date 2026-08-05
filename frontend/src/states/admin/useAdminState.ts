import { useAtom } from 'jotai';
import { User } from '../../api/api';
import { useApi } from '../../clients/api/useApi';
import { UsersState } from './adminState';

export function useAdminState() {
	const api = useApi();

	const [users, setUsers] = useAtom(UsersState);

	const getUsers = async (): Promise<User[]> => {
		const users: User[] = await api.client.services.admin.getUsers();
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

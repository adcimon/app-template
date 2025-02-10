import * as Recoil from 'recoil';
import { useApiState } from '../api/useApiState';
import { UsersState } from './adminState';

export function useAdminState() {
	const apiState = useApiState();

	const [users, setUsers] = Recoil.useRecoilState(UsersState);

	const getUsers = async (): Promise<any[]> => {
		const dtos: any[] = await apiState.client?.adminService.getUsers();
		setUsers(dtos);
		return dtos;
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

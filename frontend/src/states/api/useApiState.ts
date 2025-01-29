import * as Recoil from 'recoil';
import { ApiClientState } from './apiState';

export function useApiState() {
	const [client, setClient] = Recoil.useRecoilState(ApiClientState);

	const reset = () => {
		setClient(undefined);
	};

	return {
		client,
		setClient,
		reset,
	};
}

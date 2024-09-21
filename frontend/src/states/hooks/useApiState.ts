import * as Recoil from 'recoil';
import { ApiClientAtom } from '../apiState';

export function useApiState() {
	const [client, setClient] = Recoil.useRecoilState(ApiClientAtom);

	const reset = () => {
		setClient(undefined);
	};

	return {
		client,
		setClient,
		reset,
	};
}

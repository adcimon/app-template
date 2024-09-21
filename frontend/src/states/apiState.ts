import * as Recoil from 'recoil';
import { ApiClient } from '../api/apiClient';

export const ApiClientAtom = Recoil.atom<ApiClient | undefined>({
	key: 'ApiClient',
	default: undefined,
});

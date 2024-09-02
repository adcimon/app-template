import { useRecoilState } from 'recoil';
import { AppState } from '../states/AppState';

export function useAppState() {
	const [appState, setAppState] = useRecoilState(AppState);
	return { appState, setAppState };
}

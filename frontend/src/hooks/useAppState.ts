import { useRecoilState } from 'recoil';
import { AppState, AppStateDefault, AppStateType } from '../states/AppState';

export function useAppState() {
	const [appState, setAppState] = useRecoilState(AppState);

	const resetAppState = () => {
		const { apiClient, theme, ...defaultAppState } = AppStateDefault;
		const newAppState: AppStateType = {
			apiClient: appState.apiClient,
			theme: appState.theme,
			...defaultAppState,
		};
		setAppState(newAppState);
	};

	return { appState, setAppState, resetAppState };
}

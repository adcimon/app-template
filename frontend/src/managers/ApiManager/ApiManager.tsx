import React from 'react';
import { ApiClient } from '../../clients/api/apiClient';
import { ApiContext } from '../../clients/api/apiContext';
import { useApi } from '../../clients/api/useApi';
import { useNavigator } from '../../core/hooks/useNavigator';
import { useUserState } from '../../states/user/useUserState';
import { AppUtils } from '../../utils/appUtils';

interface ApiManagerProps {
	children?: React.ReactNode;
}

export const ApiManager = (props: ApiManagerProps): React.JSX.Element => {
	const apiClientRef = React.useRef<ApiClient | null>(null);
	const [initialized, setInitialized] = React.useState(false);

	const api = useApi();
	const navigator = useNavigator();
	const userState = useUserState();

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		try {
			const config: any = await AppUtils.getConfig();
			console.log(config);

			apiClientRef.current = new ApiClient({
				endpoint: config['endpoint'] ?? '',
				getAccessToken: api.getAccessToken,
				getRefreshToken: api.getRefreshToken,
				onAuthRefresh: handleAuthRefresh,
				onAuthError: handleAuthError,
				onVersionMismatch: handleVersionMismatch,
			});

			setInitialized(true);
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleAuthRefresh = (accessToken: string, refreshToken: string) => {
		api.setAccessToken(accessToken);
		api.setRefreshToken(refreshToken);
	};

	const handleAuthError = () => {
		api.clearTokens();
		userState.reset();
	};

	const handleVersionMismatch = (clientVersion: string, serverVersion: string) => {
		navigator.navigate('/error', {
			params: AppUtils.getErrorParams('The app is out of date, please refresh the page.'),
		});
	};

	const render = () => {
		if (!initialized || !apiClientRef.current) {
			return <></>;
		}

		return <ApiContext.Provider value={{ client: apiClientRef.current }}>{props.children}</ApiContext.Provider>;
	};

	return render();
};

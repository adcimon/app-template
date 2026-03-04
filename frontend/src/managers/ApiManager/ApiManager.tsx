import React from 'react';
import { ApiContext, useApi } from '../../clients/api/apiContext';
import { ApiClient } from '../../clients/api/apiClient';
import { useUserState } from '../../states/user/useUserState';
import { AppUtils } from '../../utils/appUtils';

interface ApiManagerProps {
	children?: React.ReactNode;
}

export const ApiManager = (props: ApiManagerProps): React.JSX.Element => {
	const apiClientRef = React.useRef<ApiClient | null>(null);
	const [initialized, setInitialized] = React.useState(false);

	const api = useApi();
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

	const render = () => {
		if (!initialized || !apiClientRef.current) {
			return <></>;
		}

		return <ApiContext.Provider value={{ client: apiClientRef.current }}>{props.children}</ApiContext.Provider>;
	};

	return render();
};

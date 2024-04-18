import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { AppViewType, AppStateType } from '../../states/AppState';
import { IApiClient, newApiClient } from '../../api/apiClient';

interface IApiManagerProps {
	children?: React.ReactNode;
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

export const ApiManager: React.FC<IApiManagerProps> = (props: IApiManagerProps): JSX.Element => {
	let endpoint: string = 'http://127.0.0.1:9000';
	let instance: AxiosInstance | null = null;
	let controller: AbortController | null = null;

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		await readConfig();

		createInstance();

		props.setAppState({
			...props.appState,
			apiClient: client,
		});
	};

	const readConfig = async (): Promise<any> => {
		try {
			const response: any = await axios.get('/config.json', { responseType: 'json' });
			console.log(response.data);
			endpoint = response?.data?.endpoint;
		} catch (error: any) {
			console.log(error);
		}
	};

	const getBaseURL = () => {
		return endpoint;
	};

	const getHttpConfig = (useAuthorization: boolean): any => {
		const accessToken: string | null = localStorage.getItem('accessToken');
		return {
			headers: {
				Authorization: useAuthorization && accessToken ? 'Bearer ' + accessToken : undefined,
			},
		};
	};

	const createInstance = () => {
		controller = new AbortController();

		instance = axios.create({
			baseURL: getBaseURL(),
			signal: controller.signal,
		});

		// Intercept responses before they are handled by then or catch.
		instance.interceptors.response.use(
			(response: any) => {
				const body: any = response?.data;
				const data: any = body?.data;
				console.log('%c%s%o', 'color:#00FF00', body?.endpoint, body);
				return Promise.resolve(data);
			},
			(error: any) => {
				const body: any = error?.response?.data;
				const endpoint: string = body?.endpoint;
				const err: any = error?.response?.data?.error;
				if (body && err) {
					console.log('%c%s%o', 'color:#FF0000', endpoint, body);
					return Promise.reject(err);
				} else {
					const endpoint: string = error.config.baseURL + error.config.url;
					console.log('%c%s%o', 'color:#FF0000', endpoint, error);
					return Promise.reject({
						code: 'network_error',
						message: error?.message,
						data: error,
					});
				}
			},
		);
	};

	const httpGet = async (endpoint: string, useAuthorization: boolean = false) => {
		const call = async () => {
			const config = getHttpConfig(useAuthorization);
			return await instance?.get(endpoint, config);
		};
		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpPost = async (endpoint: string, data: object, useAuthorization: boolean = false) => {
		const call = async () => {
			const config = getHttpConfig(useAuthorization);
			return await instance?.post(endpoint, data, config);
		};
		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpPatch = async (endpoint: string, data: object, useAuthorization: boolean = false) => {
		const call = async () => {
			const config = getHttpConfig(useAuthorization);
			return await instance?.patch(endpoint, data, config);
		};
		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpPut = async (endpoint: string, data: object, useAuthorization: boolean = false) => {
		const call = async () => {
			const config = getHttpConfig(useAuthorization);
			return await instance?.put(endpoint, data, config);
		};
		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpDelete = async (endpoint: string, data: object, useAuthorization: boolean = false) => {
		const call = async () => {
			const config = getHttpConfig(useAuthorization);
			config.data = data;
			return await instance?.delete(endpoint, config);
		};
		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const cancelRequests = () => {
		controller?.abort();
		createInstance();
	};

	const handleError = async (call: any, error: any) => {
		if (error?.code === 'unauthorized') {
			// Try to refresh the access token.
			try {
				await client.authService.refreshToken();
			} catch (err: any) {}

			// Call the API endpoint again.
			try {
				return await call();
			} catch (err: any) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				props.setAppState({
					...props.appState,
					apiClient: client,
					appView: AppViewType.SignIn,
					user: {},
				});

				throw error;
			}
		} else {
			throw error;
		}
	};

	const client: IApiClient = newApiClient(httpGet, httpPost, httpPatch, httpPut, httpDelete, cancelRequests);

	const render = () => {
		return <>{props.appState.apiClient && props.children}</>;
	};

	return render();
};

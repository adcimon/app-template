import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { AppViewType } from '../../states/AppState';
import { useAppState } from '../../hooks/useAppState';
import { HttpParams } from '../../api/httpMethods';
import { IApiClient, newApiClient } from '../../api/apiClient';

interface IApiManagerProps {
	children?: React.ReactNode;
}

export const ApiManager: React.FC<IApiManagerProps> = (props: IApiManagerProps): JSX.Element => {
	const { appState, setAppState } = useAppState();

	let endpoint: string = 'http://127.0.0.1:9000';
	let instance: AxiosInstance | null = null;
	let controller: AbortController | null = null;

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		await readConfig();

		createInstance();

		setAppState({
			...appState,
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

	const getHttpConfig = (options: { useAuthorization?: boolean; useForm?: boolean }): any => {
		const accessToken: string | null = localStorage.getItem('accessToken');
		const authorization: string | undefined =
			options.useAuthorization && accessToken ? 'Bearer ' + accessToken : undefined;
		const contentType: string | undefined = options.useForm ? 'multipart/form-data' : undefined;
		return {
			headers: {
				Authorization: authorization,
				ContentType: contentType,
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

	const httpGet = async (params: HttpParams) => {
		const endpoint: string = params.endpoint ?? '';
		const useAuthorization: boolean = params.useAuthorization ?? false;

		const call = async () => {
			const config = getHttpConfig({
				useAuthorization,
			});
			return await instance?.get(endpoint, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpPost = async (params: HttpParams) => {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useForm: boolean = data instanceof FormData;

		const call = async () => {
			const config = getHttpConfig({
				useAuthorization,
				useForm,
			});
			return await instance?.post(endpoint, data, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpPatch = async (params: HttpParams) => {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;

		const call = async () => {
			const config = getHttpConfig({
				useAuthorization,
			});
			return await instance?.patch(endpoint, data, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpPut = async (params: HttpParams) => {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;

		const call = async () => {
			const config = getHttpConfig({
				useAuthorization,
			});
			return await instance?.put(endpoint, data, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const httpDelete = async (params: HttpParams) => {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;

		const call = async () => {
			const config = getHttpConfig({
				useAuthorization,
			});
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

				setAppState({
					...appState,
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
		return <>{appState.apiClient && props.children}</>;
	};

	return render();
};

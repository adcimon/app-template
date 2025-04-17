import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { Credentials } from '../../model/api/credentials';
import { useApiState } from '../../states/api/useApiState';
import { useUserState } from '../../states/user/useUserState';
import { HttpParams } from '../../api/httpMethods';
import { ApiClient } from '../../api/apiClient';
import { ConsoleUtils } from '../../utils/consoleUtils';

interface ApiManagerProps {
	children?: React.ReactNode;
}

export const ApiManager = (props: ApiManagerProps): JSX.Element => {
	const apiState = useApiState();
	const userState = useUserState();

	let endpoint: string = 'http://127.0.0.1:9000';
	let instance: AxiosInstance;
	let controller: AbortController;

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		await readConfig();

		createInstance();

		apiState.setClient(client);
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

	const getHttpConfig = (options: { useAuthorization?: boolean; useForm?: boolean }): any => {
		const accessToken: string | undefined = localStorage.getItem('accessToken') ?? undefined;
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
			baseURL: endpoint,
			signal: controller.signal,
		});

		// Intercept requests.
		instance.interceptors.request.use(
			(config: any) => {
				const endpoint: string = `${config?.baseURL}${config?.url}`;
				const method: string = config?.method?.toUpperCase();
				const data: any = config?.data || {};
				ConsoleUtils.logRequest(method, endpoint, data);
				return config;
			},
			(error: any) => {
				return Promise.reject({
					code: 'network_error',
					message: error.message,
					data: error,
				});
			},
		);

		// Intercept responses.
		instance.interceptors.response.use(
			(response: any) => {
				const status: number = response?.status;
				const body: any = response?.data;
				const endpoint: string = body?.endpoint;
				const data: any = body?.data;
				ConsoleUtils.logResponse(status, endpoint, body);
				return Promise.resolve(data);
			},
			(error: any) => {
				const status: number = error?.response?.status ?? 666;
				const body: any = error?.response?.data;
				const endpoint: string = body?.endpoint;
				const err: any = error?.response?.data?.error;
				if (body && err) {
					ConsoleUtils.logResponse(status, endpoint, body);
					return Promise.reject(err);
				} else {
					const endpoint: string = error.config.baseURL + error.config.url;
					ConsoleUtils.logResponse(status, endpoint, error);
					return Promise.reject({
						code: 'network_error',
						message: error.message,
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
				const refreshToken: string = localStorage.getItem('refreshToken') || '';
				const credentials: Credentials = await client.authService.refreshToken(refreshToken);

				const accessToken: string = credentials.accessToken;
				localStorage.setItem('accessToken', accessToken);
			} catch (err: any) {}

			// Call the API endpoint again.
			try {
				return await call();
			} catch (err: any) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				apiState.setClient(client);
				userState.reset();

				throw error;
			}
		} else {
			throw error;
		}
	};

	const client: ApiClient = new ApiClient(httpGet, httpPost, httpPatch, httpPut, httpDelete, cancelRequests);

	const render = () => {
		return <>{apiState.client && props.children}</>;
	};

	return render();
};

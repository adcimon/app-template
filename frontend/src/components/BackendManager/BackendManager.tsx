import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { AppViewType, AppStateType } from '../../states/AppState';
import { IBackendClient } from './IBackendClient';

interface IBackendManagerProps {
	children?: React.ReactNode;
	appState: AppStateType;
	setAppState: (state: AppStateType) => void;
}

export const BackendManager: React.FC<IBackendManagerProps> = (props: IBackendManagerProps): JSX.Element => {
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
			backendClient: client,
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

	const httpDelete = async (endpoint: string, useAuthorization: boolean = false) => {
		const call = async () => {
			const config = getHttpConfig(useAuthorization);
			return await instance?.delete(endpoint, config);
		};
		try {
			return await call();
		} catch (error: any) {
			return await handleError(call, error);
		}
	};

	const handleError = async (call: any, error: any) => {
		if (error?.code === 'unauthorized') {
			// Try to refresh the access token.
			try {
				await client.refreshToken();
			} catch (err: any) {}

			// Call the API endpoint again.
			try {
				return await call();
			} catch (err: any) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				props.setAppState({
					...props.appState,
					backendClient: client,
					appView: AppViewType.SignIn,
					user: {},
				});

				throw error;
			}
		} else {
			throw error;
		}
	};

	const client: IBackendClient = (() => {
		return {
			cancelRequests: () => {
				controller?.abort();
				createInstance();
			},
			signUp: async (email: string, password: string): Promise<any> => {
				return httpPost('/auth/signup', {
					email,
					password: btoa(password),
				});
			},
			signDown: async (password: string): Promise<any> => {
				const response: any = await httpPost(
					'/auth/signdown',
					{
						password: btoa(password),
					},
					true,
				);

				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				return response;
			},
			signIn: async (email: string, password: string): Promise<any> => {
				const response: any = await httpPost('/auth/signin', {
					email,
					password: btoa(password),
				});

				const accessToken: string = response.accessToken;
				localStorage.setItem('accessToken', accessToken);
				const refreshToken: string = response.refreshToken;
				localStorage.setItem('refreshToken', refreshToken);

				return response;
			},
			signOut: async (): Promise<any> => {
				const response: any = await httpPost('/auth/signout', {}, true);

				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				return response;
			},
			refreshToken: async (): Promise<any> => {
				const response: any = await httpPost('/auth/refresh-token', {
					refreshToken: localStorage.getItem('refreshToken'),
				});

				const accessToken: string = response.accessToken;
				localStorage.setItem('accessToken', accessToken);

				return response;
			},
			forgotPassword: async (email: string): Promise<any> => {
				return httpPost('/auth/forgot-password', {
					email,
				});
			},
			changePassword: async (email: string, code: string, password: string): Promise<any> => {
				return httpPost('/auth/change-password', {
					email,
					code,
					password: btoa(password),
				});
			},
			verifyEmail: async (code: string): Promise<any> => {
				return httpPost(
					'/auth/verify-email',
					{
						code,
					},
					true,
				);
			},
			getUsers: async (): Promise<any> => {
				return httpGet('/users', true);
			},
			getMyUser: async (): Promise<any> => {
				return httpGet('/users/me', true);
			},
			updateMyUser: async (
				name: string,
				surname: string,
				birthdate: string,
				country: string,
				timezone: string,
			): Promise<any> => {
				return httpPatch(
					'/users/me',
					{
						name,
						surname,
						birthdate,
						country,
						timezone,
					},
					true,
				);
			},
			updateMyEmail: async (email: string): Promise<any> => {
				return httpPatch(
					'/users/me/email',
					{
						email,
					},
					true,
				);
			},
			updateMyPhone: async (phone: string): Promise<any> => {
				return httpPatch(
					'/users/me/phone',
					{
						phone,
					},
					true,
				);
			},
			updateMyPassword: async (currentPassword: string, newPassword: string): Promise<any> => {
				return httpPatch(
					'/users/me/password',
					{
						currentPassword: btoa(currentPassword),
						newPassword: btoa(newPassword),
					},
					true,
				);
			},
			updateMyAvatar: async (avatar: string): Promise<any> => {
				return httpPatch(
					'/users/me/avatar',
					{
						avatar,
					},
					true,
				);
			},
		};
	})();

	const render = () => {
		return <>{props.appState.backendClient && props.children}</>;
	};

	return render();
};

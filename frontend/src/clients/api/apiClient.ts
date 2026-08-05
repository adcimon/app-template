import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AppCredentials, endpoints } from '../../api/api';
import { ServiceRegistry, ServiceMap } from './serviceRegistry';
import { RequestInterceptor } from './interceptors/requestInterceptor';
import { ResponseInterceptor } from './interceptors/responseInterceptor';

export type ApiRequest = {
	endpointId: keyof typeof endpoints;
	pathParams?: Record<string, string>;
	body?: any;
	useAuthorization?: boolean;
	useCredentials?: boolean;
};

export interface ApiConfig {
	endpoint: string;
	getAccessToken: () => string;
	getRefreshToken: () => string;
	onAuthRefresh: (accessToken: string, refreshToken: string) => void;
	onAuthError: () => void;
	onVersionMismatch: (clientVersion: string, serverVersion: string) => void;
}

export class ApiClient {
	private instance: AxiosInstance | undefined;
	private controller: AbortController | undefined;

	public services!: ServiceMap;

	constructor(private config: ApiConfig) {
		config.endpoint = config.endpoint || 'http://localhost:9000';
		this.createInstance();
		this.registerServices();
	}

	private createInstance() {
		this.controller = new AbortController();

		this.instance = axios.create({
			baseURL: this.config.endpoint,
			signal: this.controller.signal,
		});

		const requestInterceptor: RequestInterceptor = new RequestInterceptor(this.config);
		this.instance.interceptors.request.use(requestInterceptor.onFulfilled, requestInterceptor.onRejected);

		const responseInterceptor: ResponseInterceptor = new ResponseInterceptor(this.config);
		this.instance.interceptors.response.use(responseInterceptor.onFulfilled, responseInterceptor.onRejected);
	}

	private registerServices() {
		const services: ServiceMap = {} as ServiceMap;

		for (const [key, ServiceClass] of Object.entries(ServiceRegistry)) {
			(services as any)[key] = new ServiceClass(this);
		}

		this.services = services;
	}

	private buildPath(endpointId: keyof typeof endpoints, pathParams?: Record<string, string>): string {
		let path: string = endpoints[endpointId]?.path ?? '';

		if (!pathParams) {
			return path;
		}

		path = path.replace(/\{(\w+)\}/g, (match: string, key: string) => encodeURIComponent(pathParams[key] ?? ''));

		return path;
	}

	private buildRequest(options: {
		useAuthorization?: boolean;
		useCredentials?: boolean;
		useForm?: boolean;
	}): AxiosRequestConfig {
		const accessToken: string | undefined = this.config.getAccessToken() || undefined;
		const authorization: string | undefined =
			options.useAuthorization && accessToken ? 'Bearer ' + accessToken : undefined;
		const contentType: string | undefined = options.useForm ? 'multipart/form-data' : undefined;

		const config: AxiosRequestConfig = {
			headers: {
				Authorization: authorization,
				ContentType: contentType,
			},
			withCredentials: options.useCredentials,
		};

		return config;
	}

	public async get<T = unknown>(params: ApiRequest): Promise<T> {
		const endpoint: string = this.buildPath(params.endpointId, params.pathParams);
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.buildRequest({
				useAuthorization,
				useCredentials,
			});
			return await this.instance?.get(endpoint, config);
		};

		try {
			return (await call()) as T;
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async post<T = unknown>(params: ApiRequest): Promise<T> {
		const endpoint: string = this.buildPath(params.endpointId, params.pathParams);
		const data: any = params.body ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;
		const useForm: boolean = data instanceof FormData;

		const call = async () => {
			const config: AxiosRequestConfig = this.buildRequest({
				useAuthorization,
				useCredentials,
				useForm,
			});
			return await this.instance?.post(endpoint, data, config);
		};

		try {
			return (await call()) as T;
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async put<T = unknown>(params: ApiRequest): Promise<T> {
		const endpoint: string = this.buildPath(params.endpointId, params.pathParams);
		const data: any = params.body ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.buildRequest({
				useAuthorization,
				useCredentials,
			});
			return await this.instance?.put(endpoint, data, config);
		};

		try {
			return (await call()) as T;
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async patch<T = unknown>(params: ApiRequest): Promise<T> {
		const endpoint: string = this.buildPath(params.endpointId, params.pathParams);
		const data: any = params.body ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.buildRequest({
				useAuthorization,
				useCredentials,
			});
			return await this.instance?.patch(endpoint, data, config);
		};

		try {
			return (await call()) as T;
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async delete<T = unknown>(params: ApiRequest): Promise<T> {
		const endpoint: string = this.buildPath(params.endpointId, params.pathParams);
		const data: any = params.body ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.buildRequest({
				useAuthorization,
				useCredentials,
			});
			config.data = data;
			return await this.instance?.delete(endpoint, config);
		};

		try {
			return (await call()) as T;
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public cancelRequests() {
		this.controller?.abort();
		this.createInstance();
	}

	private async handleError(call: any, error: any) {
		if (error?.code === 'unauthorized') {
			// Try to refresh the access token.
			try {
				const refreshToken: string = this.config.getRefreshToken();
				const credentials: AppCredentials = await this.services.auth.refreshToken({ refreshToken });
				this.config.onAuthRefresh(credentials.accessToken, credentials.refreshToken);
			} catch (err: any) {}

			// Call the endpoint again.
			try {
				return await call();
			} catch (err: any) {
				this.config.onAuthError();
				throw error;
			}
		} else {
			throw error;
		}
	}
}

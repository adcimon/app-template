import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestInterceptor } from './interceptors/requestInterceptor';
import { ResponseInterceptor } from './interceptors/responseInterceptor';
import { AuthService } from './services/authService';
import { UsersService } from './services/usersService';
import { AdminService } from './services/adminService';
import { Credentials } from '../../model/api/credentials';

export type ApiParams = {
	endpoint?: string;
	data?: any;
	useAuthorization?: boolean;
	useCredentials?: boolean;
};

export interface ApiClientConfig {
	endpoint: string;
	getAccessToken: () => string;
	getRefreshToken: () => string;
	onAuthRefresh: (accessToken: string, refreshToken: string) => void;
	onAuthError: () => void;
}

export class ApiClient {
	private instance: AxiosInstance | undefined;
	private controller: AbortController | undefined;

	authService: AuthService;
	usersService: UsersService;
	adminService: AdminService;

	constructor(private config: ApiClientConfig) {
		config.endpoint = config.endpoint || 'http://localhost:9000';

		this.createInstance();

		this.authService = new AuthService(this);
		this.usersService = new UsersService(this);
		this.adminService = new AdminService(this);
	}

	private createRequestConfig(options: {
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

	private createInstance() {
		this.controller = new AbortController();

		this.instance = axios.create({
			baseURL: this.config.endpoint,
			signal: this.controller.signal,
		});

		this.instance.interceptors.request.use(RequestInterceptor.onFulfilled, RequestInterceptor.onRejected);
		this.instance.interceptors.response.use(ResponseInterceptor.onFulfilled, ResponseInterceptor.onRejected);
	}

	public async get(params: ApiParams) {
		const endpoint: string = params.endpoint ?? '';
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.createRequestConfig({
				useAuthorization,
				useCredentials,
			});
			return await this.instance?.get(endpoint, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async post(params: ApiParams) {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;
		const useForm: boolean = data instanceof FormData;

		const call = async () => {
			const config: AxiosRequestConfig = this.createRequestConfig({
				useAuthorization,
				useCredentials,
				useForm,
			});
			return await this.instance?.post(endpoint, data, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async patch(params: ApiParams) {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.createRequestConfig({
				useAuthorization,
				useCredentials,
			});
			return await this.instance?.patch(endpoint, data, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async put(params: ApiParams) {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.createRequestConfig({
				useAuthorization,
				useCredentials,
			});
			return await this.instance?.put(endpoint, data, config);
		};

		try {
			return await call();
		} catch (error: any) {
			return await this.handleError(call, error);
		}
	}

	public async delete(params: ApiParams) {
		const endpoint: string = params.endpoint ?? '';
		const data: any = params.data ?? undefined;
		const useAuthorization: boolean = params.useAuthorization ?? false;
		const useCredentials: boolean = params.useCredentials ?? true;

		const call = async () => {
			const config: AxiosRequestConfig = this.createRequestConfig({
				useAuthorization,
				useCredentials,
			});
			config.data = data;
			return await this.instance?.delete(endpoint, config);
		};

		try {
			return await call();
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
				const credentials: Credentials = await this.authService.refreshToken(refreshToken);
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

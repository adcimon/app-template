// @generated openapi.json
// @version 1.0.0

export const version = '1.0.0';

export type AppCredentials = {
	identityToken: string;
	accessToken: string;
	refreshToken: string;
};

export enum AuthMethod {
	None = 'none',
	Bearer = 'bearer',
}

export type ChangePasswordDto = {
	currentPassword: string;
	newPassword: string;
};

export type ConfirmPasswordDto = {
	email: string;
	code: string;
	password: string;
};

export enum ErrorCode {
	GenericError = 'generic_error',
	InvalidRequest = 'invalid_request',
	ValidationError = 'validation_error',
	Unauthorized = 'unauthorized',
	Forbidden = 'forbidden',
	NotFound = 'not_found',
	EmailTaken = 'email_taken',
	ConfigurationError = 'configuration_error',
}

export type ApiError = {
	code: ErrorCode;
	status: number;
	message: string;
	detail?: unknown;
};

export type ApiResponse = {
	version: string;
	endpoint: string;
	docs: string;
	timestamp: string;
	data?: unknown;
	error?: ApiError;
};

export type ForgotPasswordDto = {
	email: string;
};

export type RefreshTokenDto = {
	refreshToken: string;
};

export enum Role {
	Admin = 'admin',
}

export type SignDownDto = {
	password: string;
};

export type SignInDto = {
	email: string;
	password: string;
};

export type SignUpDto = {
	email: string;
	password: string;
};

export type Status = {
	status: boolean;
};

export type UpdateEmailDto = {
	email: string;
};

export type UpdateIconDto = {
	icon?: string;
};

export type UpdatePhoneDto = {
	phone?: string;
};

export type UpdateUserDto = {
	name: string;
	surname?: string;
	birthdate?: string;
	locale?: string;
	timezone?: string;
};

export type User = {
	id: string;
	name: string;
	surname: string;
	birthdate: string;
	email: string;
	emailVerified: boolean;
	phone: string;
	phoneVerified: boolean;
	locale: string;
	timezone: string;
	icon: string;
	roles: Role[];
};

export type VerifyEmailDto = {
	code: string;
};

export enum Method {
	Get = 'GET',
	Post = 'POST',
	Patch = 'PATCH',
}

export type BodyType = {
	contentType: string;
	wrapper: string;
	type: string;
	isArray: boolean;
};

export type Param = {
	name: string;
	type: string;
	required: boolean;
};

export type ParamsType = {
	type: string;
	params: Param[];
};

export type Endpoint = {
	method: Method;
	path: string;
	pathParams: ParamsType;
	queryParams: ParamsType;
	requestBody: BodyType;
	responseBody: BodyType;
	security: AuthMethod[];
};

export const endpoints: Record<string, Endpoint> = {
	'Admin/getUsers': {
		method: Method.Get,
		path: '/users',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: '', wrapper: '', type: '', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: true },
		security: [AuthMethod.Bearer],
	},
	'Auth/changePassword': {
		method: Method.Post,
		path: '/auth/change-password',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'ChangePasswordDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'Status', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Auth/confirmPassword': {
		method: Method.Post,
		path: '/auth/confirm-password',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'ConfirmPasswordDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'Status', isArray: false },
		security: [],
	},
	'Auth/forgotPassword': {
		method: Method.Post,
		path: '/auth/forgot-password',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'ForgotPasswordDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'Status', isArray: false },
		security: [],
	},
	'Auth/refreshToken': {
		method: Method.Post,
		path: '/auth/refresh-token',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'RefreshTokenDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'AppCredentials', isArray: false },
		security: [],
	},
	'Auth/signDown': {
		method: Method.Post,
		path: '/auth/sign-down',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'SignDownDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'Status', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Auth/signIn': {
		method: Method.Post,
		path: '/auth/sign-in',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'SignInDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'AppCredentials', isArray: false },
		security: [],
	},
	'Auth/signOut': {
		method: Method.Post,
		path: '/auth/sign-out',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: '', wrapper: '', type: '', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'Status', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Auth/signUp': {
		method: Method.Post,
		path: '/auth/sign-up',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'SignUpDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: false },
		security: [],
	},
	'Auth/verifyEmail': {
		method: Method.Post,
		path: '/auth/verify-email',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'VerifyEmailDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'Status', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Docs/getOpenApiJson': {
		method: Method.Get,
		path: '/docs/openapi.json',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: '', wrapper: '', type: '', isArray: false },
		responseBody: { contentType: '', wrapper: '', type: '', isArray: false },
		security: [],
	},
	'Docs/getOpenApiYaml': {
		method: Method.Get,
		path: '/docs/openapi.yaml',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: '', wrapper: '', type: '', isArray: false },
		responseBody: { contentType: '', wrapper: '', type: '', isArray: false },
		security: [],
	},
	'Users/getUser': {
		method: Method.Get,
		path: '/users/me',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: '', wrapper: '', type: '', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Users/updateEmail': {
		method: Method.Patch,
		path: '/users/me/email',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'UpdateEmailDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Users/updateIcon': {
		method: Method.Patch,
		path: '/users/me/icon',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'UpdateIconDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Users/updatePhone': {
		method: Method.Patch,
		path: '/users/me/phone',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'UpdatePhoneDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: false },
		security: [AuthMethod.Bearer],
	},
	'Users/updateUser': {
		method: Method.Patch,
		path: '/users/me',
		pathParams: { type: '', params: [] },
		queryParams: { type: '', params: [] },
		requestBody: { contentType: 'application/json', wrapper: '', type: 'UpdateUserDto', isArray: false },
		responseBody: { contentType: 'application/json', wrapper: 'ApiResponse', type: 'User', isArray: false },
		security: [AuthMethod.Bearer],
	},
};

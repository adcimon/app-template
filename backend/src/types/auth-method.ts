import { ApiEnums } from '../api/api-enums.js';

export enum AuthMethod {
	None = 'none',
	Bearer = 'bearer',
}

ApiEnums.register('AuthMethod', AuthMethod);

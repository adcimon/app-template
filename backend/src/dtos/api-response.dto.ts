import { ApiErrorDto } from './api-error.dto.js';

export class ApiResponseDto {
	version: string;
	endpoint: string;
	timestamp: string;
	data?: any;
	error?: ApiErrorDto;
}

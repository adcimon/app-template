import { ErrorDto } from './error.dto.js';

export class ResponseDto {
	version: string;
	endpoint: string;
	timestamp: string;
	data?: any;
	error?: ErrorDto;
}

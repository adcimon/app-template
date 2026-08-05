import { ApiProperty } from '@nestjs/swagger';
import { ApiError } from './api-error.js';

export class ApiResponse {
	@ApiProperty()
	version: string;

	@ApiProperty()
	endpoint: string;

	@ApiProperty()
	docs: string;

	@ApiProperty()
	timestamp: string;

	@ApiProperty({ required: false })
	data?: any;

	@ApiProperty({ type: () => ApiError, required: false })
	error?: ApiError;
}

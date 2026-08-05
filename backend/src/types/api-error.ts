import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from './error-code.js';

export class ApiError {
	@ApiProperty({ enum: ErrorCode })
	code: ErrorCode;

	@ApiProperty()
	status: number;

	@ApiProperty()
	message: string;

	@ApiProperty({ required: false })
	detail?: object;

	constructor(code: ErrorCode, status: HttpStatus, message: string, detail?: object) {
		this.code = code;
		this.status = status;
		this.message = message;
		this.detail = detail;
	}
}

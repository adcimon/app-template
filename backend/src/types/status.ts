import { ApiProperty } from '@nestjs/swagger';

export class Status {
	@ApiProperty()
	status: boolean;
}

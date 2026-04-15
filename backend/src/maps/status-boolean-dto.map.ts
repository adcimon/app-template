import { StatusDto } from '../dtos/status.dto.js';

export function StatusBooleanToDto(status: boolean): StatusDto {
	const dto: StatusDto = new StatusDto();
	dto.status = status;
	return dto;
}

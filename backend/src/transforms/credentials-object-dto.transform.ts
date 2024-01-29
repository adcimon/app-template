import { CredentialsDto } from '../dtos/credentials.dto';

export function CredentialsObjectToDto(credentials: any): CredentialsDto {
	const dto: CredentialsDto = new CredentialsDto();
	dto.accessToken = credentials.accessToken;
	dto.refreshToken = credentials.refreshToken;
	return dto;
}

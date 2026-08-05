import { ApiProperty } from '@nestjs/swagger';

export class AppCredentials {
	@ApiProperty()
	identityToken: string = '';

	@ApiProperty()
	accessToken: string = '';

	@ApiProperty()
	refreshToken: string = '';
}

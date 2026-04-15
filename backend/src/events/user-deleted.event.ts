import { UserDto } from '../modules/users/user.dto.js';

export class UserDeletedEvent {
	public static readonly name: string = 'user.deleted';

	constructor(public readonly user: UserDto) {}
}

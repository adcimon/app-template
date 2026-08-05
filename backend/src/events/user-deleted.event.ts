import { User } from '../modules/users/types/user.js';

export class UserDeletedEvent {
	public static readonly name: string = 'user.deleted';

	constructor(public readonly user: User) {}
}

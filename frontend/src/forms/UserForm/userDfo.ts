import { UpdateUserDto } from '../../api/api';

export type UserDfo = Partial<Omit<UpdateUserDto, 'name'>> & Pick<UpdateUserDto, 'name'>;

export const newUserDfo = (): UserDfo => ({
	name: '',
	surname: '',
	birthdate: '',
	locale: '',
	timezone: '',
});

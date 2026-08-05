import { atom } from 'jotai';
import { User } from '../../api/api';

export const UsersState = atom<User[]>([]);

import { atom } from 'jotai';
import { User } from '../../model/api/user';

export const UserState = atom<User | undefined>(undefined);

import { atom } from 'jotai';
import { User } from '../../api/api';

export const UserState = atom<User | undefined>(undefined);

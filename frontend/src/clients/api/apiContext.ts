import React from 'react';
import { ApiClient } from './apiClient';

export interface ApiContextType {
	client: ApiClient | null;
}

export const ApiContext = React.createContext<ApiContextType>({
	client: null,
});

import React from 'react';
import { ApiClient } from './apiClient';

interface ApiContextType {
	client: ApiClient | null;
}

export const ApiContext = React.createContext<ApiContextType>({
	client: null,
});

export const useApi = () => {
	const context: ApiContextType = React.useContext(ApiContext);

	const getAccessToken = (): string => {
		return localStorage.getItem('accessToken') ?? '';
	};

	const getRefreshToken = (): string => {
		return localStorage.getItem('refreshToken') ?? '';
	};

	const setAccessToken = (token: string): void => {
		localStorage.setItem('accessToken', token);
	};

	const setRefreshToken = (token: string): void => {
		localStorage.setItem('refreshToken', token);
	};

	const clearTokens = (): void => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	};

	return {
		client: context.client,
		getAccessToken,
		getRefreshToken,
		setAccessToken,
		setRefreshToken,
		clearTokens,
	};
};

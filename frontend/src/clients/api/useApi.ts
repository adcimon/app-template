import React from 'react';
import { ApiClient } from './apiClient';
import { ApiContext, ApiContextType } from './apiContext';

export const useApi = () => {
	const context: ApiContextType = React.useContext(ApiContext);

	const getClient = (): ApiClient => {
		if (!context.client) {
			throw new Error('ApiClient not initialized');
		}

		return context.client;
	};

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
		get client(): ApiClient {
			return getClient();
		},
		getAccessToken,
		getRefreshToken,
		setAccessToken,
		setRefreshToken,
		clearTokens,
	};
};

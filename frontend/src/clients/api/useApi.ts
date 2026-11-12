import React from 'react';
import { ApiClient } from './apiClient';
import { ApiContext, ApiContextType } from './apiContext';
import { StorageKey } from '../../types/storageKey';
import { StorageUtils } from '../../utils/storageUtils';

export const useApi = () => {
	const context: ApiContextType = React.useContext(ApiContext);

	const getClient = (): ApiClient => {
		if (!context.client) {
			throw new Error('ApiClient not initialized');
		}

		return context.client;
	};

	const getAccessToken = (): string => {
		return StorageUtils.get(StorageKey.AccessToken, '');
	};

	const getRefreshToken = (): string => {
		return StorageUtils.get(StorageKey.RefreshToken, '');
	};

	const setAccessToken = (token: string): void => {
		StorageUtils.set(StorageKey.AccessToken, token);
	};

	const setRefreshToken = (token: string): void => {
		StorageUtils.set(StorageKey.RefreshToken, token);
	};

	const clearTokens = (): void => {
		StorageUtils.remove(StorageKey.AccessToken);
		StorageUtils.remove(StorageKey.RefreshToken);
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

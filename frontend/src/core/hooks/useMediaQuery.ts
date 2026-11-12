import React from 'react';

export function useMediaQuery(query: string): boolean {
	const mediaQuery: string = query.replace(/^@media( ?)/m, '');

	const subscribe = React.useCallback(
		(callback: () => void) => {
			const mediaQueryList: MediaQueryList = window.matchMedia(mediaQuery);
			mediaQueryList.addEventListener('change', callback);
			return () => mediaQueryList.removeEventListener('change', callback);
		},
		[mediaQuery],
	);

	const getSnapshot = React.useCallback((): boolean => {
		return window.matchMedia(mediaQuery).matches;
	}, [mediaQuery]);

	return React.useSyncExternalStore(subscribe, getSnapshot);
}

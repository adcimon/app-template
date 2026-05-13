import React from 'react';

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const callbackRef = React.useRef<T>(callback);

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const debouncedCallback = React.useCallback(
		((...args: any[]) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callbackRef.current(...args);
			}, delay);
		}) as T,
		[delay],
	);

	return debouncedCallback;
}

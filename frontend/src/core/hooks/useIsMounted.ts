import React from 'react';

/**
 * Custom hook for determining if the component is currently mounted.
 * @returns {() => boolean} A function that returns a boolean value indicating whether the component is mounted.
 * @example
 * const isComponentMounted = useIsMounted();
 */
export function useIsMounted(): () => boolean {
	const isMounted = React.useRef(false);

	React.useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return React.useCallback(() => isMounted.current, []);
}

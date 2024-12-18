import { useState } from 'react';
import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type WindowSize = {
	width: number;
	height: number;
};

export function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>(() => {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	});

	function handleSize() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEventListener('resize', handleSize);

	// Set size at the first load.
	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);

	return windowSize;
}

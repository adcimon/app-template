import React from 'react';
import { windowsController } from './windowsController';
import { WindowEvent, WindowEventListener } from './windowEvent';

export const useWindowEvent = (listener: WindowEventListener): void => {
	const listenerRef = React.useRef(listener);
	listenerRef.current = listener;

	React.useEffect(() => {
		return windowsController.addEventListener((event: WindowEvent) => listenerRef.current(event));
	}, []);
};

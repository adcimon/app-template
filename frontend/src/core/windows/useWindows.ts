import React from 'react';
import { windowsController } from './windowsController';
import { WindowHandle } from './windowHandle';
import { WindowState } from './windowState';

export const useWindows = (): WindowHandle[] => {
	const windows: ReadonlyMap<string, WindowState> = React.useSyncExternalStore(
		windowsController.subscribe,
		windowsController.getSnapshot,
	);

	return React.useMemo(() => [...windows.values()].map((state: WindowState) => new WindowHandle(state)), [windows]);
};

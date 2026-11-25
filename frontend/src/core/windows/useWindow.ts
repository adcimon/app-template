import React from 'react';
import { windowsController } from './windowsController';
import { WindowHandle } from './windowHandle';
import { WindowState } from './windowState';

export const useWindow = (id?: string): WindowHandle | undefined => {
	const windows: ReadonlyMap<string, WindowState> = React.useSyncExternalStore(
		windowsController.subscribe,
		windowsController.getSnapshot,
	);

	if (!id) {
		return undefined;
	}

	return new WindowHandle(windows.get(id) ?? { id, dockable: false, open: false, undocked: false });
};

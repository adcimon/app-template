import { windowsController } from './windowsController';
import { WindowState } from './windowState';

export class WindowHandle {
	public readonly state: WindowState;

	public constructor(state: WindowState) {
		this.state = state;
	}

	public open = (): void => {
		windowsController.open(this.state.id);
	};

	public close = (): void => {
		windowsController.close(this.state.id);
	};

	public dock = (): void => {
		windowsController.dock(this.state.id);
	};

	public undock = (): void => {
		windowsController.undock(this.state.id);
	};

	public focus = (): void => {
		windowsController.focus(this.state.id);
	};
}

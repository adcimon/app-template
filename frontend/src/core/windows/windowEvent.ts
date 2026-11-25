import { WindowState } from './windowState';

export enum WindowEventType {
	Open = 'open',
	Close = 'close',
	Dock = 'dock',
	Undock = 'undock',
	Blocked = 'blocked',
}

export interface WindowEvent {
	type: WindowEventType;
	state: WindowState;
}

export type WindowEventListener = (event: WindowEvent) => void;

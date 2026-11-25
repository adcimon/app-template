import React from 'react';
import { WindowEventListener, WindowEventType } from './windowEvent';
import { WindowState } from './windowState';

type WindowsListener = () => void;

export class WindowsController {
	private readonly listeners: Set<WindowsListener> = new Set();
	private readonly eventListeners: Set<WindowEventListener> = new Set();

	private readonly nativeWindows: Map<string, Window> = new Map();
	private windows: ReadonlyMap<string, WindowState> = new Map();

	public subscribe = (listener: WindowsListener): (() => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	};

	public getSnapshot = (): ReadonlyMap<string, WindowState> => {
		return this.windows;
	};

	public addEventListener(listener: WindowEventListener): () => void {
		this.eventListeners.add(listener);
		return () => {
			this.eventListeners.delete(listener);
		};
	}

	public register(id: string, title?: string, icon?: React.ReactNode, dockable: boolean = false): void {
		if (this.windows.has(id)) {
			console.warn(`Window '${id}' is already registered.`);
			return;
		}

		const next = new Map(this.windows);
		next.set(id, { id, title, icon, dockable, open: false, undocked: false });
		this.set(next);
	}

	public unregister(id: string): void {
		if (!this.windows.has(id)) {
			return;
		}

		const next = new Map(this.windows);
		next.delete(id);
		this.nativeWindows.delete(id);
		this.set(next);
	}

	public setNativeWindow(id: string, nativeWindow: Window): void {
		if (!this.windows.has(id)) {
			console.warn(`Window '${id}' is not registered.`);
			return;
		}

		this.nativeWindows.set(id, nativeWindow);
	}

	public open(id: string): void {
		this.update(id, { open: true });
		this.emit(WindowEventType.Open, id);
	}

	public close(id: string): void {
		this.update(id, { open: false, undocked: false });
		this.emit(WindowEventType.Close, id);
	}

	public dock(id: string): void {
		this.update(id, { undocked: false });
		this.emit(WindowEventType.Dock, id);
	}

	public undock(id: string): void {
		this.update(id, { undocked: true });
		this.emit(WindowEventType.Undock, id);
	}

	public focus(id: string): void {
		const nativeWindow: Window | undefined = this.nativeWindows.get(id);
		if (nativeWindow && !nativeWindow.closed) {
			nativeWindow.focus();
		}
	}

	public undockBlocked(id: string): void {
		this.update(id, { undocked: false });
		this.emit(WindowEventType.Blocked, id);
	}

	public closeAll(): void {
		[...this.windows.values()]
			.filter((state: WindowState) => state.open)
			.forEach((state: WindowState) => this.close(state.id));
	}

	private set(windows: ReadonlyMap<string, WindowState>): void {
		this.windows = windows;
		this.listeners.forEach((listener: WindowsListener) => listener());
	}

	private update(id: string, patch: Partial<WindowState>): void {
		const current: WindowState | undefined = this.windows.get(id);
		if (!current) {
			console.warn(`Window '${id}' is not registered.`);
			return;
		}

		const updated: WindowState = { ...current, ...patch };
		const next = new Map(this.windows);
		next.set(id, updated);

		if (!updated.open || !updated.undocked) {
			this.nativeWindows.delete(id);
		}

		this.set(next);
	}

	private emit(type: WindowEventType, id: string): void {
		const state: WindowState | undefined = this.windows.get(id);
		if (!state) {
			return;
		}

		this.eventListeners.forEach((listener: WindowEventListener) => listener({ type, state }));
	}
}

export const windowsController = new WindowsController();

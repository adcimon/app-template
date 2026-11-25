import React from 'react';

export interface WindowState {
	id: string;
	title?: string;
	icon?: React.ReactNode;
	dockable: boolean;
	open: boolean;
	undocked: boolean;
}

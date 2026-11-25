import React from 'react';

export interface RouteGroupProps {
	layout?: React.ComponentType<{ children?: React.ReactNode }>;
	redirect?: string;
	children?: React.ReactNode;
}

export const RouteGroup = (props: RouteGroupProps) => {
	const render = () => {
		return <>{props.children}</>;
	};

	return render();
};

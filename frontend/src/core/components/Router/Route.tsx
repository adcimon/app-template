import React from 'react';
import { RouterContext } from './Router';

export interface IRouteProps {
	path: string;
	children?: React.ReactNode;
}

export const Route = (props: IRouteProps) => {
	const { path } = React.useContext(RouterContext);

	const render = () => {
		return props.path === path || props.path === '*' ? <>{props.children}</> : null;
	};

	return render();
};

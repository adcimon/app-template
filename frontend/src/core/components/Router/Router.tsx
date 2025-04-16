import React from 'react';
import { IRouteProps } from './Route';

interface RouterProps {
	children?: React.ReactNode;
}

export const RouterContext = React.createContext<{
	path: string;
	state: any;
}>({
	path: window.location.pathname,
	state: window.history.state,
});

export const Router = (props: RouterProps) => {
	const [path, setPath] = React.useState<string>(window.location.pathname);
	const [state, setState] = React.useState<any>();

	const handlePopState = (event: PopStateEvent) => {
		setPath(window.location.pathname);
		setState(event.state);
	};

	React.useEffect(() => {
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const render = () => {
		let match = null;
		const routes = React.Children.toArray(props.children);
		for (const child of routes) {
			if (React.isValidElement<IRouteProps>(child) && (child.props.path === path || child.props.path === '*')) {
				match = child;
				break;
			}
		}

		return <RouterContext.Provider value={{ path, state }}>{match}</RouterContext.Provider>;
	};

	return render();
};

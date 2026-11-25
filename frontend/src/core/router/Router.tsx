import React from 'react';
import { RouteProps } from './Route';
import { RouteGroup, RouteGroupProps } from './RouteGroup';
import { RouteRedirect } from './RouteRedirect';

interface RouterProps {
	children?: React.ReactNode;
}

interface RouteMatch {
	route: React.ReactElement<RouteProps>;
	group?: React.ReactElement<RouteGroupProps>;
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

	const findMatch = (
		children: React.ReactNode,
		group?: React.ReactElement<RouteGroupProps>,
	): RouteMatch | undefined => {
		for (const child of React.Children.toArray(children)) {
			if (!React.isValidElement(child)) {
				continue;
			}

			if (child.type === RouteGroup) {
				const groupElement = child as React.ReactElement<RouteGroupProps>;
				const match: RouteMatch | undefined = findMatch(groupElement.props.children, groupElement);
				if (match !== undefined) {
					return match;
				}
				continue;
			}

			const route = child as React.ReactElement<RouteProps>;
			if (route.props.path === path || route.props.path === '*') {
				return { route, group };
			}
		}

		return undefined;
	};

	const renderMatch = () => {
		const match: RouteMatch | undefined = findMatch(props.children);
		if (match === undefined) {
			return null;
		}

		const redirect: string | undefined = match.group?.props.redirect;
		if (redirect !== undefined) {
			return <RouteRedirect path={redirect} />;
		}

		const Layout = match.group?.props.layout;
		if (Layout === undefined) {
			return match.route.props.children;
		}

		return <Layout>{match.route.props.children}</Layout>;
	};

	const render = () => {
		return <RouterContext.Provider value={{ path, state }}>{renderMatch()}</RouterContext.Provider>;
	};

	return render();
};

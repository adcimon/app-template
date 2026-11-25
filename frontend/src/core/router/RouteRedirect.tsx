import React from 'react';
import { useNavigator } from './useNavigator';

interface RouteRedirectProps {
	path: string;
}

export const RouteRedirect = (props: RouteRedirectProps) => {
	const navigator = useNavigator();

	React.useEffect(() => {
		navigator.navigate(props.path, {
			params: navigator.params,
			replace: true,
		});
	}, [props.path]);

	const render = () => {
		return null;
	};

	return render();
};

import React from 'react';

export function useNavigator() {
	const [url, setUrl] = React.useState<URL>(new URL(window.location.href));

	const handlePopState = (event: PopStateEvent) => {
		setUrl(new URL(window.location.href));
	};

	React.useEffect(() => {
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const getParam = (name: string): string => {
		return url.searchParams.get(name) || '';
	};

	const getParams = (name: string): string[] => {
		return url.searchParams.getAll(name);
	};

	const hasParam = (name: string): boolean => {
		return url.searchParams.has(name);
	};

	const navigate = (
		path: string,
		params?: {
			params?: URLSearchParams;
			state?: any;
			replace?: boolean;
		},
	) => {
		const searchParams: string = params?.params?.toString() || '';
		const url: string = `${path}${searchParams ? `?${searchParams}` : ''}`;
		const state: any = params?.state;
		const replace: boolean = params?.replace ?? false;

		if (replace) {
			window.history.replaceState(state, '', url);
		} else {
			window.history.pushState(state, '', url);
		}

		const event: PopStateEvent = new PopStateEvent('popstate', { state });
		window.dispatchEvent(event);
	};

	const redirect = (url: string) => {
		window.location.href = url;
	};

	return {
		url,
		path: url.pathname,
		params: url.searchParams,
		getParam,
		getParams,
		hasParam,
		navigate,
		redirect,
	};
}

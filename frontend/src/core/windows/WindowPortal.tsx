import React from 'react';
import { createPortal } from 'react-dom';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import { Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { WindowStyleSync } from './windowStyleSync';

interface WindowPortalProps {
	title?: string;
	width?: number;
	height?: number;
	onOpen?: (nativeWindow: Window) => void;
	onClose?: (event: any) => void;
	onBlocked?: () => void;
	children?: React.ReactNode;
}

interface WindowPortalState {
	win: Window;
	container: HTMLElement;
	cache: EmotionCache;
}

const portalComponents: string[] = ['MuiDialog', 'MuiDrawer', 'MuiMenu', 'MuiModal', 'MuiPopover', 'MuiPopper'];

export const WindowPortal = (props: WindowPortalProps): React.JSX.Element => {
	const width: number = props.width ?? 960;
	const height: number = props.height ?? 720;

	const onCloseRef = React.useRef(props.onClose);
	onCloseRef.current = props.onClose;

	const onOpenRef = React.useRef(props.onOpen);
	onOpenRef.current = props.onOpen;

	const onBlockedRef = React.useRef(props.onBlocked);
	onBlockedRef.current = props.onBlocked;

	const [portal, setPortal] = React.useState<WindowPortalState | undefined>(undefined);

	React.useEffect(() => {
		const left: number = Math.round(window.screenX + (window.outerWidth - width) / 2);
		const top: number = Math.round(window.screenY + (window.outerHeight - height) / 2);
		const win: Window | null = window.open('', '', `popup,width=${width},height=${height},left=${left},top=${top}`);
		if (!win) {
			onBlockedRef.current?.();
			return;
		}

		const doc: Document = win.document;
		doc.title = props.title ?? '';
		doc.documentElement.style.height = '100%';
		doc.body.style.height = '100%';
		doc.body.style.margin = '0';

		const container: HTMLElement = doc.createElement('div');
		container.style.height = '100%';
		doc.body.appendChild(container);

		const styleSync: WindowStyleSync = new WindowStyleSync(document, doc);
		styleSync.start();

		const cache: EmotionCache = createCache({
			key: 'portal',
			container: doc.head,
		});

		const handleClosed = (event: PageTransitionEvent) => onCloseRef.current?.(event);
		const handleMainUnload = () => win.close();
		win.addEventListener('pagehide', handleClosed);
		window.addEventListener('beforeunload', handleMainUnload);

		setPortal({ win, container, cache });
		onOpenRef.current?.(win);
		win.focus();

		return () => {
			win.removeEventListener('pagehide', handleClosed);
			window.removeEventListener('beforeunload', handleMainUnload);
			styleSync.stop();
			setPortal(undefined);
			win.close();
		};
	}, []);

	React.useEffect(() => {
		if (portal) {
			portal.win.document.title = props.title ?? '';
		}
	}, [portal, props.title]);

	const getTheme = (theme: Theme): Theme => {
		const components: any = { ...theme.components };
		portalComponents.forEach((name: string) => {
			components[name] = {
				...components[name],
				defaultProps: {
					...components[name]?.defaultProps,
					container: portal?.container.ownerDocument.body,
				},
			};
		});
		return { ...theme, components };
	};

	const render = () => {
		if (!portal) {
			return <></>;
		}

		return createPortal(
			<CacheProvider value={portal.cache}>
				<ThemeProvider theme={getTheme}>
					<CssBaseline />
					{props.children}
				</ThemeProvider>
			</CacheProvider>,
			portal.container,
		);
	};

	return render();
};

import Bowser from 'bowser';

export namespace BrowserUtils {
	export const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera || undefined;

	const result: Bowser.Parser.ParsedResult = Bowser.parse(userAgent);

	export const isDesktop = (): boolean => {
		return result.platform.type == 'desktop';
	};

	export const isWebGLSupported = (): boolean => {
		try {
			const canvas: HTMLCanvasElement = document.createElement('canvas');
			const supported: boolean = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
			canvas.remove();
			return supported;
		} catch {
			return false;
		}
	};

	export const isWebGPUSupported = (): boolean => {
		if ((navigator as any).gpu) {
			return true;
		} else {
			return false;
		}
	};

	export const isWebRTCSupported = (): boolean => {
		const hasUserMedia: boolean = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

		const hasPeerConnection: boolean =
			typeof RTCPeerConnection !== 'undefined' ||
			typeof (window as any).mozRTCPeerConnection !== 'undefined' ||
			typeof (window as any).webkitRTCPeerConnection !== 'undefined';

		const hasDataChannel: boolean = typeof RTCDataChannel !== 'undefined';

		return hasUserMedia && hasPeerConnection && hasDataChannel;
	};

	export const isWebXRSupported = (): boolean => {
		if (navigator.xr && typeof navigator.xr.isSessionSupported === 'function') {
			return true;
		} else {
			return false;
		}
	};
}

import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const ToastManager = (): React.JSX.Element => {
	const render = () => {
		return (
			<Toaster
				position='top-center'
				toastOptions={{
					duration: 5000,
				}}
				containerStyle={{
					top: '10px',
				}}
			/>
		);
	};

	return render();
};

ToastManager.success = (message: string) => {
	message = message.charAt(0).toUpperCase() + message.slice(1);
	message = message.endsWith('.') ? message : message + '.';
	toast.success(message);
};

ToastManager.error = (message: string) => {
	message = message.charAt(0).toUpperCase() + message.slice(1);
	message = message.endsWith('.') ? message : message + '.';
	toast.error(message);
};

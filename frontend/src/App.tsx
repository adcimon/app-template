import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeManager } from './managers/ThemeManager/ThemeManager';
import { ApiManager } from './managers/ApiManager/ApiManager';
import { Toaster } from 'react-hot-toast';
import { AppView } from './views/AppView/AppView';

export default function App() {
	return (
		<RecoilRoot>
			<ThemeManager>
				<ApiManager>
					<Toaster
						position='top-center'
						toastOptions={{
							duration: 5000,
						}}
						containerStyle={{
							top: '10px',
						}}
					/>
					<AppView />
				</ApiManager>
			</ThemeManager>
		</RecoilRoot>
	);
}

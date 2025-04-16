import React from 'react';
import { RecoilRoot } from 'recoil';
import { ApiManager } from './managers/ApiManager/ApiManager';
import { ThemeManager } from './managers/ThemeManager/ThemeManager';
import { ToastManager } from './managers/ToastManager/ToastManager';
import { AppView } from './views/AppView/AppView';

export default function App() {
	return (
		<RecoilRoot>
			<ThemeManager>
				<ApiManager>
					<ToastManager />
					<AppView />
				</ApiManager>
			</ThemeManager>
		</RecoilRoot>
	);
}

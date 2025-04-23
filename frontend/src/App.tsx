import React from 'react';
import { RecoilRoot } from 'recoil';
import { ApiManager } from './managers/ApiManager/ApiManager';
import { AppManager } from './managers/AppManager/AppManager';
import { ThemeManager } from './managers/ThemeManager/ThemeManager';
import { ToastManager } from './managers/ToastManager/ToastManager';
import { AppView } from './views/AppView/AppView';

export default function App() {
	return (
		<RecoilRoot>
			<AppManager>
				<ThemeManager>
					<ApiManager>
						<ToastManager />
						<AppView />
					</ApiManager>
				</ThemeManager>
			</AppManager>
		</RecoilRoot>
	);
}

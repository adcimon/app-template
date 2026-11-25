import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Window, WindowMode } from '../../core/windows/Window';
import { SettingsPanel } from '../../panels/SettingsPanel/SettingsPanel';
import { AppWindow } from '../../types/appWindow';

export const SettingsWindow = (): React.JSX.Element => {
	const render = () => {
		return (
			<Window
				id={AppWindow.Settings}
				mode={WindowMode.Overlay}
				dockable={true}
				title='Settings'
				icon={<SettingsIcon />}
				maxWidth='lg'>
				<SettingsPanel />
			</Window>
		);
	};

	return render();
};

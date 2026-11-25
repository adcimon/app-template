import React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import { Window, WindowMode } from '../../core/windows/Window';
import { HelpPanel } from '../../panels/HelpPanel/HelpPanel';
import { AppWindow } from '../../types/appWindow';

export const HelpWindow = (): React.JSX.Element => {
	const render = () => {
		return (
			<Window
				id={AppWindow.Help}
				mode={WindowMode.Overlay}
				dockable={true}
				title='Help'
				icon={<HelpIcon />}
				maxWidth='lg'>
				<HelpPanel />
			</Window>
		);
	};

	return render();
};

import React from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import { Window, WindowMode } from '../../core/windows/Window';
import { ManagementPanel } from '../../panels/ManagementPanel/ManagementPanel';
import { AppWindow } from '../../types/appWindow';

export const ManagementWindow = (): React.JSX.Element => {
	const render = () => {
		return (
			<Window
				id={AppWindow.Management}
				mode={WindowMode.Overlay}
				dockable={true}
				title='Management'
				icon={<SecurityIcon />}
				maxWidth='lg'>
				<ManagementPanel />
			</Window>
		);
	};

	return render();
};

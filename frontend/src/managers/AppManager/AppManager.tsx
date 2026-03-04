import React from 'react';
import { useAppState } from '../../states/app/useAppState';
import { AppUtils } from '../../utils/appUtils';

interface AppManagerProps {
	children?: React.ReactNode;
}

export const AppManager = (props: AppManagerProps): React.JSX.Element => {
	const appState = useAppState();

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		try {
			const metadata: any = await AppUtils.getMetadata();
			console.log(metadata);
			appState.setMetadata(metadata);
		} catch (error: any) {
			console.log(error);
		}
	};

	const render = () => {
		return <>{props.children}</>;
	};

	return render();
};

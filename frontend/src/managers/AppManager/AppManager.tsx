import React from 'react';
import axios from 'axios';
import { useAppState } from '../../states/app/useAppState';

interface AppManagerProps {
	children?: React.ReactNode;
}

export const AppManager = (props: AppManagerProps): React.JSX.Element => {
	const appState = useAppState();

	React.useEffect(() => {
		init();
	}, []);

	const init = async () => {
		await readMetadata();
	};

	const readMetadata = async (): Promise<any> => {
		try {
			const response: any = await axios.get('/metadata.json', { responseType: 'json' });
			const metadata: object = response.data;
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

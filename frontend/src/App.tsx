import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeManagerContainer } from './components/ThemeManager/ThemeManagerContainer';
import { BackendManagerContainer } from './components/BackendManager/BackendManagerContainer';
import { Toaster } from 'react-hot-toast';
import { AppViewContainer } from './components/AppView/AppViewContainer';

export default function App() {
	return (
		<>
			<RecoilRoot>
				<ThemeManagerContainer>
					<BackendManagerContainer>
						<Toaster
							containerStyle={{
								top: '10px',
							}}
							position='top-center'
							toastOptions={{
								duration: 5000,
							}}
						/>
						<AppViewContainer />
					</BackendManagerContainer>
				</ThemeManagerContainer>
			</RecoilRoot>
		</>
	);
}

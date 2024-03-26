import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeManagerContainer } from './components/ThemeManager/ThemeManagerContainer';
import { ApiManagerContainer } from './components/ApiManager/ApiManagerContainer';
import { Toaster } from 'react-hot-toast';
import { AppViewContainer } from './components/AppView/AppViewContainer';

export default function App() {
	return (
		<>
			<RecoilRoot>
				<ThemeManagerContainer>
					<ApiManagerContainer>
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
					</ApiManagerContainer>
				</ThemeManagerContainer>
			</RecoilRoot>
		</>
	);
}

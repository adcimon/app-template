import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeManagerContainer } from './managers/ThemeManager/ThemeManagerContainer';
import { ApiManagerContainer } from './managers/ApiManager/ApiManagerContainer';
import { Toaster } from 'react-hot-toast';
import { AppViewContainer } from './views/AppView/AppViewContainer';

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

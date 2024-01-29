import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const rootElement: HTMLElement | null = document.getElementById('root');
const root: ReactDOM.Root = ReactDOM.createRoot(rootElement!);

root.render(<App />);

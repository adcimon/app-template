import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const rootElement: HTMLElement | undefined = document.getElementById('root') ?? undefined;
const root: ReactDOM.Root = ReactDOM.createRoot(rootElement!);

root.render(<App />);

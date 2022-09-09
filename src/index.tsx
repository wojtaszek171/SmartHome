import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './Components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
serviceWorker.unregister();

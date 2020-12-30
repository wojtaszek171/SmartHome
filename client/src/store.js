import { createStore } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const store = createStore(reducers, composeWithDevTools());
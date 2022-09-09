import { configureStore } from '@reduxjs/toolkit';
import { isDev } from './helpers';
import reducers from './reducers';

export const store = configureStore({
    reducer: reducers,
    middleware: (gDM) => gDM(),
    devTools: isDev()
});

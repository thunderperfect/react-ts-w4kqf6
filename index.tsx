import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import store from './app/store';
import { Provider } from 'react-redux';

import 'antd/dist/antd.min.css';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

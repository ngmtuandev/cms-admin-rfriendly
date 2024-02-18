import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactQuery from './libs/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactQuery>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactQuery>
);

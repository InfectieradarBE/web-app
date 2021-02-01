import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

// FONTS
import '@fontsource/open-sans';
// import '@fontsource/open-sans/300.css'; // for light font
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/700.css';

import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';

import 'bootstrap/dist/js/bootstrap.bundle';

import { Provider } from 'react-redux';
import store from './store/store';
import './index.scss';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setDefaultAccessTokenHeader } from './api/instances/authenticatedApi';

const token = store.getState().app.auth?.accessToken;
if (token) {
  setDefaultAccessTokenHeader(token);
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

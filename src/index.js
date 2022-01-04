import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// redux stuff
import { createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducers from './reducers/';
// css
import App from './App';
import { history } from './helpers/history';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider store={createStore(reducers)}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

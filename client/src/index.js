import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// redux stuff
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './features/user';
import roomsReducer from './features/rooms';
import locationReducer from './features/location';
import messageReducer from './features/newMessages'

// css
import App from './App';

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
    location: locationReducer,
    newMessages: messageReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

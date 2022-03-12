import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import roomsReducer from '../features/rooms';
import locationReducer from '../features/location';
import friendsReducer from '../features/friends';
import roomContentReducer from '../features/roomContent';


const combineReducer = combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  location: locationReducer,
  friends: friendsReducer,
  roomContent: roomContentReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = {};
  }
  return combineReducer(state, action);
}

export default configureStore({
  reducer: rootReducer
})

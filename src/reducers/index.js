import { combineReducers } from "@reduxjs/toolkit";

const userAuthentication = (user = null, action) => {
  if (action.type === 'USER_LOGIN') {
    return action.payload;
  }
  if (action.type === 'USER_LOGOUT') {
    return action.payload;
  }
  
  return user;
}


// this is my 'state' when using mapStateToProps function
export default combineReducers({
  user: userAuthentication
})
// these are ACTIONS

export const login = ( action ) => {
  console.log(action);
  return { 
    type: 'USER_LOGIN',
    payload: action
  }
}

export const logout = () => {
  return { 
    type: 'USER_LOGOUT',
    payload: null
  }
}
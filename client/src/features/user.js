import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { 
    value: {
      id: '', 
      displayName: '',
      image: '',
      tag: 0,
      email: '',
      status: 0
    } 
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    updateUserStatus: (state, action) => {
      const newValue = {...state.value};
      newValue.currentStatus = action.payload;
      state.value = newValue;
    } 
  }
})

export const { login, updateUserStatus } = userSlice.actions;

export default userSlice.reducer;
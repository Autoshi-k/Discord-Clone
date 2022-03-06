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
      statusId: 0
    } 
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    updateMyStatus: (state, action) => {
      const newStatus = action.payload;
      state.value.statusId = newStatus;
    } 
  }
})

export const { login, updateMyStatus } = userSlice.actions;

export default userSlice.reducer;
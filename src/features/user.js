import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: { 
    status: false,
    value: {
      displayName: '',
      linked: {},
      conversations: [],
      tag: 0,
      email: '',
      status: 0
    } 
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.value = action.payload;
    }
  }
})

export const { login } = userSlice.actions;

export default userSlice.reducer;
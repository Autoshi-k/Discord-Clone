import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: { 
    status: false,
    value: {
      nickname: '',
      linked: {},
      conversations: [],
      tag: 0,
      email: '',
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
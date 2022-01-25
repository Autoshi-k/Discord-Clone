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
    addRoom: (state, action) => {
      state.value = {
        ...state.value,
        rooms: {
          ...state.value.rooms,
          private: [...state.value.rooms.private, action.payload]
        }
      }
    }
  }
})

export const { login } = userSlice.actions;

export default userSlice.reducer;
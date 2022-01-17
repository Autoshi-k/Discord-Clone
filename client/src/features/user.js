import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { 
    value: {
      displayName: '',
      image: '',
      rooms: {
        private: [],
        servers: []
      },
      friends: [],
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

export const { login, addRoom } = userSlice.actions;

export default userSlice.reducer;
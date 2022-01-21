import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      lobby: 'private-messages',
      room: {
        roomId: '',
        userId: ''
      }
    }
  },
  reducers: {
    changeLocation: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { changeLocation } = locationSlice.actions;

export default locationSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      lobby: 'direct-messages',
      room: 'friends',
      subRoom: 'online'
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
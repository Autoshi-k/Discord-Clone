import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: {
      lobby: 'private-messages',
      room: ''
    }
  },
  reducers: {
    changeLocation: (state, action) => {
      state.value = { lobby: action.payload.lobby, room: action.payload.room }
    }
  }
})

export const { changeLocation } = locationSlice.actions;

export default locationSlice.reducer;
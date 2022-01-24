import { createSlice } from "@reduxjs/toolkit";

export const oldMessagesSlice = createSlice({
  name: 'oldMessages',
  initialState: {
    value: {
      rooms: []
    }
  },
  reducers: {
    getChatHistory: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { getChatHistory } = oldMessagesSlice.actions;

export default oldMessagesSlice.reducer;
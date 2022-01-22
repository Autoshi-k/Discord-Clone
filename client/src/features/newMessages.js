import { sliderClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export const newMessagesSlice = createSlice({
  name: 'newMessages',
  initialState: {
    value: {
      messages: []
    }
  },
  reducers: {
    addNewMessage: (state, action) => {
      state.value = {
        messages: [...state.value.messages, action.payload]
      }
    }
  }
})

export const { addNewMessage } = newMessagesSlice.actions;

export default newMessagesSlice.reducer;
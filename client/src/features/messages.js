import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    value: {
      room: [{
        roomId: '',
        messages:[]
      }]
    }
  },
  reducers: {
    fetchOldMessages: (state, action) => {

    },
    addNewMessage: (state, action) => {
      state.value = {
        messages: [...state.value.messages, action.payload]
      }
    }
  }
})

export const { addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
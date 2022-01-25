import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    value: {
      rooms: [{
        roomId: '',
        messages:[]
      }]
    }
  },
  reducers: {
    fetchOldMessages: (state, action) => {

    }, 
    newRoom: (state, action) => {
      const newState = [...state.value.rooms];
      newState.push(action.payload);
      state.value.rooms = newState;
    },
    deleteRoom: (state, action) => {
      const newValuePrivate = [...state.value.private];
      const index = newValuePrivate.indexOf(action.payload);
      if (index !== -1) newValuePrivate.splice(index, 1);
      state.value.private = newValuePrivate;
    }, 
    addNewMessage: (state, action) => {
      state.value = {
        messages: [...state.value.messages, action.payload]
      }
    }
  }
})

export const { addNewMessage, newRoom, deleteRoom } = messagesSlice.actions;

export default messagesSlice.reducer;
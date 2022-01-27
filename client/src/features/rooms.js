import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    value: {}
  },
  reducers: {
    fetchOldRooms: (state, action) => {
      state.value = action.payload;
    }, 
    newRoom: (state, action) => {
      const roomId = action.payload.roomId;
      const newValue = {...state.value};
      newValue[roomId] = action.payload.room;
      state.value = newValue;
    },
    deleteRoom: (state, action) => {
      
    }, 
    addNewMessage: (state, action) => {
      let newValue = {...state.value};
      let newMessageArray = [...state.value[action.payload.roomId].messages];
      newMessageArray.push(action.payload.message);
      newValue[action.payload.roomId] = {...state.value[action.payload.roomId], messages: newMessageArray }
      state.value = newValue;
      
    }
  }
})

export const { fetchOldRooms, addNewMessage, newRoom, deleteRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
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
      // action.payload:  room (obj) and roomId
      const roomId = action.payload.roomId;
      const newValue = {...state.value};
      newValue[roomId] = action.payload.room;
      state.value = newValue;
    },
    deleteRoom: (state, action) => {
      const newValuePrivate = [...state.value.private];
      const index = newValuePrivate.indexOf(action.payload);
      if (index !== -1) newValuePrivate.splice(index, 1);
      state.value.private = newValuePrivate;
    }, 
    addNewMessage: (state, action) => {
      // action.payload: { room(roomId), message(_id, participantId, content) }
      // check if room exist if yes push this message, else make new
      let newState = [...state.value.rooms];
      const index = state.value.rooms.indexOf(room => room.roomId === action.payload.roomId);
      index ?
      newState.push({room: action.payload.roomId, messages: action.payload.message})
      // : newState[index].messages.push([...newState[index].messages, action.payload.message]);
      : newState[index].messages.push(['becky']);
      state.value.rooms = '';      
    }
  }
})

export const { fetchOldRooms, addNewMessage, newRoom, deleteRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
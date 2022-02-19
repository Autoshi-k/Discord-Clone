import { createSlice, current } from "@reduxjs/toolkit";

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
      const newValue = {...current(state.value)};
      newValue[action.payload.roomId] = action.payload.friend;
      state.value = newValue;
    },
    deleteRoom: (state, action) => {
      
    }, 
    updateStatus: (state, action) => {
      const wantedId = action.payload.userId;
      let newValue = {...state.value}
      const roomIds = Object.keys(state.value).map(key => key);
      roomIds.forEach(roomId => Object.keys(state.value[roomId].participants).forEach(participantId => {
          if (current(state.value)[roomId].participants[participantId]._id === wantedId) {
          newValue[roomId].participants[participantId].currentStatus = action.payload.newStatus;
        }
      }
      ));
      state.value = newValue;
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

export const { fetchOldRooms, updateStatus, addNewMessage, newRoom, deleteRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
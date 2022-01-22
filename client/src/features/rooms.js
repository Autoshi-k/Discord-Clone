import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: { 
    value: {
      private: [],
      servers: []
    } 
  },
  reducers: {
    newRoom: (state, action) => {
      const newValuePrivate = [...state.value.private];
      newValuePrivate.push(action.payload);
      state.value.private = newValuePrivate;
    },
    deleteRoom: (state, action) => {
      const newValuePrivate = [...state.value.private];
      const index = newValuePrivate.indexOf(action.payload);
      if (index !== -1) newValuePrivate.splice(index, 1);
      state.value.private = newValuePrivate;
    }
  }
})

export const { newRoom, deleteRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
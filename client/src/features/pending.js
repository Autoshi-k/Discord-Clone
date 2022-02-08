import { createSlice } from "@reduxjs/toolkit";

export const pandingSlice = createSlice({
  name: 'pending',
  initialState: {
    value: {
      pendingRequests: []
    }
  },
  reducers: {
    pendingFetch: (state, action) => {
      state.value = action.payload;
    },
    newFriendRequests: (state, action) => {
      console.log('hello')
      const newArray = [...state.value.pendingRequests];
      newArray.push(action.payload);
      state.value = { pendingRequests: newArray };
    }
  }
})


export const { pendingFetch, newFriendRequests } = pandingSlice.actions;

export default pandingSlice.reducer;
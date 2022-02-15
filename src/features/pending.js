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
      let newArray = [...state.value.pendingRequests];
      newArray.push(action.payload);
      state.value = { pendingRequests: newArray };
    },
    removeFriendRequest: (state, action) => {
      let newState = [...state.value.pendingRequests];
      const index = newState.find(request => request.sender === action.payload.senderId && request.id === action.payload.reciverId)
      newState.splice(index, 1);
      console.log(newState);
      state.value = { pendingRequests: newState };
    }
  }
})


export const { pendingFetch, newFriendRequests, removeFriendRequest } = pandingSlice.actions;

export default pandingSlice.reducer;
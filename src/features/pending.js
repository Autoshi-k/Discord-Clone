import { createSlice, current } from "@reduxjs/toolkit";

export const pandingSlice = createSlice({
  name: 'pending',
  initialState: {
    value: {
      pendingRequests: []
    }
  },
  reducers: {
    pendingFetch: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
    newFriendRequests: (state, action) => {
      let newArray = [...current(state.value)];
      console.log(action.payload);
      newArray.push(action.payload);
      state.value = newArray;
    },
    removeFriendRequest: (state, action) => {
      let newArray = [...current(state.value)];
      const { id, otherId } = action.payload;
      const index = newArray.find(request => request.id === id || request.id === otherId)
      newArray.splice(index, 1);
      state.value = newArray;
    }
  }
})


export const { pendingFetch, newFriendRequests, removeFriendRequest } = pandingSlice.actions;

export default pandingSlice.reducer;
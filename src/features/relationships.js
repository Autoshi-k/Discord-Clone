import { createSlice } from "@reduxjs/toolkit";

export const relationshipsSlice = createSlice({
  name: 'relationships',
  initialState: {
    value: {
      friends: [],
      pending: [],
      blocked: []
    }
  },
  reducers: {
    newFriendRequest: (state, action) => {
      // getting action with 
      // {
      //    status: outgoing/ingoing
      //    userId: {
      //      displayName:
      //      tag:
      //      image:
      //  }
      //}
      const newValue = {...state.value, pending: [...state.value.pending, action.payload]};
      state.value = newValue;
    }
  }
})


export const { makeFriendRequest } = relationshipsSlice.actions;

export default relationshipsSlice.reducer;
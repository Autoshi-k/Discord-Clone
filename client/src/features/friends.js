import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    value: {
      friends: []
    }
  },
  reducers: {
    friendsFetch: (state, action) => {
      state.value = action.payload;
    },
    addFriend: (state, action) => {
      let newArray = [...state.value.friends];
      newArray.push(action.payload);
      state.value = { friends: newArray };
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


export const { friendsFetch, addFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
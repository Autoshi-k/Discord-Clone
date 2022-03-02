import { createSlice, current } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    value: {
      friends: [],
      pending: [],
      errorSendingRecentRequest: { status: false, error: '' } 
    }
  },
  reducers: {
    initFetch: (state, action) => {
      const connections = action.payload;
      const [friends, pendings] = splitArray(connections, (x) => x.confirmed) // if have to change it later when ill have more types
      state.value.pending = pendings;
      state.value.friends = friends;
    },
    acceptFriend: (state, action) => {
      const friendId = action.payload;
      const pendingArray = [...current(state.value.pending)];
      const friendsArray = [...current(state.value.friends)];
      const index = pendingArray.find(request => request.friendId === friendId);
      friendsArray.push(pendingArray.splice(index, 1)[0]);
      state.value.pending = pendingArray;
      state.value.friends = friendsArray;
    },
    declineFriend: (state, action) => {
      const friendId = action.payload;
      const pendingArray = [...current(state.value.pending)];
      const index = pendingArray.find(request => request.friendId === friendId);
      pendingArray.splice(index, 1);
      state.value.pending = pendingArray;
    },
    createRequest: (state, action) => {
      const friendRequest = action.payload;
      const pendingArray = [...current(state.value.pending)];
      pendingArray.push(friendRequest);
      state.value.pending = pendingArray;
    },
    createError: (state, action) => {
      const { error, message } = action.payload;
      state.value.errorSendingRecentRequest = { status: true, error, message }
    },
    clearError: (state) => {
      state.value.errorSendingRecentRequest = { status: false, error: '' };
    }
  }
})

export const { initFetch, acceptFriend, declineFriend, createRequest, createError, clearError } = friendsSlice.actions;

export default friendsSlice.reducer;

const splitArray = (array, condition) => {
  const a1 = [], a2 = [];
  array.forEach(item => condition(item) ? a1.push(item) : a2.push(item));
  return [a1, a2];
}
import { createSlice, current } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    value: []
  },
  reducers: {
    friendsFetch: (state, action) => {
      state.value = action.payload;
    },
    addFriend: (state, action) => {
      let newArray = [...current(state.value)];
      newArray.push(action.payload);
      state.value = newArray;
    }
  }
})


export const { friendsFetch, addFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
import { createSlice, current } from "@reduxjs/toolkit";

export const roomContentSlice = createSlice({
  name: 'roomContent',
  initialState: {
    value: {
      usersInRoom: {},
      messages: []
    }
  },
  reducers: {
    messagesFetch: (state, action) => {
      let users = {};
      action.payload.usersInRoom.forEach(user => {
        users[user.id] = { 
          name: user.name, 
          avatar: user.avatar,
          tag: user.tag,
          color: user.color
        }
      })
      state.value = {
        usersInRoom: users,
        messages: action.payload.messages.reverse()
      }
    },
    newMessage: (state, action) => {
      let newArray = [...current(state.value.messages)];
      console.log(action.payload);
      newArray.push(action.payload);
      state.value.messages = newArray;
    }
  }
})


export const { messagesFetch, newMessage } = roomContentSlice.actions;

export default roomContentSlice.reducer;